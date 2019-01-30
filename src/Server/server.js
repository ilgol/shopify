import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import cookie from 'cookie';
import nonce from 'nonce';
import querystring from 'querystring';
import request from 'request-promise';
import { POST, GET, DELETE, PUT } from './services/HTTPRequestHelper';
import { FORWARDING_ADDRESS, API_KEY, SCOPES, SCRIPT_TAG_BODY, API_SECRET, SHOP_REQUEST_HEADERS, ADMIN_SHOP_REQUEST_URL, SHOP_REQUEST_URL, PATHES, STOREFRONT_ACCESS_TOKEN_BODY, PRODUCT_LISTING_BODY, CDN_BASE_URL } from './services/Constant';
import { parseAddress } from './services/Helper';

const app = express();
let accessToken = '';
const storeFrontAccessToken = '';
let adminShopRequestUrl = ADMIN_SHOP_REQUEST_URL;
let shopRequestUrl = SHOP_REQUEST_URL;
const isAllProductInSalesChannelListing = false;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/e-box', (req, res) => {
  console.log('e-box');
  res.set('Content-Type', 'application/liquid');
  res.status(200).send(
    `
      <div id='e-box-container'></div>      
      <script src='${ CDN_BASE_URL }/UI/main.js'></script>
    `
  );
});

app.get('/admin', (req, res) => {
  console.log('admin');
  res.status(200).send('Hello From Admin');
});

app.post('/create_checkout', (req, res) => {
  console.log('checkout');
  const address = req.body.location;
  const shippingId = req.body.shippingId;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const username = req.body.username;
  const { zip, country, province, city, street } = parseAddress(address);
  const cart = req.body.cart;
  const CHECKOUT_BODY = {
    checkout: {
      line_items: [ ...[ ...cart ] ],
      shipping_address: {
        address1: street,
        city,
        first_name,
        last_name,
        zip,
        country_code: country,
        province_code: province,
      },
      email: username,
    },
  };
  const CHECKOUT_BODY_WITH_SHIPPING = {
    checkout: {
      token: '',
      shipping_line: {
        handle: '',
      },
    },
  };

  POST(
    request,
    null,
    adminShopRequestUrl.replace('{{path}}', PATHES.CheckOut),
    CHECKOUT_BODY,
    SHOP_REQUEST_HEADERS,
    (checkOutResponse) => {
      const { checkout } = checkOutResponse || {};
      const { token } = checkout || {};

      GET(
        request,
        null,
        adminShopRequestUrl.replace('{{path}}', PATHES.ShippingRates).replace('{{token}}', token),
        SHOP_REQUEST_HEADERS,
        (shippingResponse) => {
          const { shipping_rates } = shippingResponse || {};
          const { handle } = shipping_rates.find(item => item.title === shippingId) || {};

          CHECKOUT_BODY_WITH_SHIPPING.checkout.token = token;
          CHECKOUT_BODY_WITH_SHIPPING.checkout.shipping_line.handle = handle;

          PUT(
            request,
            null,
            adminShopRequestUrl.replace('{{path}}', PATHES.CheckOutWithToken).replace('{{token}}', token),
            CHECKOUT_BODY_WITH_SHIPPING,
            SHOP_REQUEST_HEADERS,
            (checkOutResponse) => {
              const { checkout } = checkOutResponse || {};
              const { web_url } = checkout || {};

              res.status(200).send(web_url);
            }
          );
        }
      );
    }
  );
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

app.get('/shopify', (req, res) => {
  const shop = req.query.shop;

  if(shop) {
    const state = nonce()();
    const redirectUri = `${ FORWARDING_ADDRESS }/shopify/callback`;
    const installUrl = `https://${ shop }/admin/oauth/authorize?client_id=${ API_KEY }&scope=${ SCOPES }&state=${ state }&redirect_uri=${ redirectUri }`;

    res.cookie('state', state);
    res.redirect(installUrl);
  } else
    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
});

//#region get access_token for common Shopify API
app.get('/shopify/callback', (req, res) => {
  const { shop, hmac, code, state } = req.query;
  const stateCookie = cookie.parse(req.headers.cookie).state;

  adminShopRequestUrl = adminShopRequestUrl.replace('{{shop}}', shop);
  shopRequestUrl = shopRequestUrl.replace('{{shop}}', shop);

  if(state !== stateCookie)
    return res.status(403).send('Request origin cannot be verified');

  if(shop && hmac && code) {
    const map = Object.assign({}, req.query);

    delete map['signature'];
    delete map['hmac'];
    const message = querystring.stringify(map);
    const providedHmac = Buffer.from(hmac, 'utf-8');
    const generatedHash = Buffer.from(
      crypto
        .createHmac('sha256', API_SECRET)
        .update(message)
        .digest('hex'),
      'utf-8'
    );
    let hashEquals = false;

    try {
      hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac);
    } catch(e) {
      hashEquals = false;
    }

    if(!hashEquals)
      return res.status(400).send('HMAC validation failed');

    const accessTokenRequestUrl = adminShopRequestUrl.replace('{{path}}', PATHES.OAuth);
    const accessTokenPayload = {
      client_id: API_KEY,
      client_secret: API_SECRET,
      code,
    };

    POST(
      request,
      null,
      accessTokenRequestUrl,
      accessTokenPayload,
      null,
      (accessTokenResponse) => {
        accessToken = accessTokenResponse.access_token;
        SHOP_REQUEST_HEADERS['X-Shopify-Access-Token'] = accessToken;

        res.redirect('/script_tag');
      }
    );
  } else
    res.status(400).send('Required parameters missing');
});
//#endregion

//#region check if script tag already exist in Shopify Online Store
app.get('/script_tag', (req, res) => {
  console.log(1);
  GET(
    request,
    null,
    adminShopRequestUrl.replace('{{path}}', PATHES.SriptTag),
    SHOP_REQUEST_HEADERS,
    (shopResponse) => {
      const { script_tags } = shopResponse || {};

      if(!script_tags.length || !script_tags.some(item => item.src === SCRIPT_TAG_BODY.script_tag.src))
        res.redirect('/add_script_tag');
      else
        res.redirect('/admin');
      // else
      //   res.redirect('/storefront_access_token');
    }
  );
});
//#endregion

//#region add script tag to Shopify Online Store
app.get('/add_script_tag', (req, res) => {
  console.log(2);
  POST(request, null, adminShopRequestUrl.replace('{{path}}', PATHES.SriptTag), SCRIPT_TAG_BODY, SHOP_REQUEST_HEADERS, null);

  res.redirect('/admin');
  //res.redirect('/storefront_access_token');
});
//#endregion

//#region to delete

// //#region check if StoreFront Access Token already exist
// app.get('/storefront_access_token', (req, res) => {
//   console.log(3);
//   GET(
//     request,
//     null,
//     adminShopRequestUrl.replace('{{path}}', PATHES.StoreFrontAccessToken),
//     SHOP_REQUEST_HEADERS,
//     (shopResponse) => {
//       const { storefront_access_tokens = [] } = JSON.parse(shopResponse) || {};
//       const { access_token } = storefront_access_tokens[0] || {};

//       if(!storefront_access_tokens.length || !storefront_access_tokens.some(item => item.title === STOREFRONT_ACCESS_TOKEN_BODY.storefront_access_token.title))
//         res.redirect('/add_storefront_access_token');
//       else {
//         storeFrontAccessToken = access_token;
//         isAllProductInSalesChannelListing
//           ? (
//             res.redirect('/home')
//           )
//           : (
//             res.redirect('/get_all_products')
//           );
//       }
//     }
//   );
// });
// //#endregion

// //#region generate new StoreFront Access Token
// app.get('/add_storefront_access_token', (req, res) => {
//   console.log(4);
//   POST(
//     request,
//     null,
//     adminShopRequestUrl.replace('{{path}}', PATHES.StoreFrontAccessToken),
//     STOREFRONT_ACCESS_TOKEN_BODY,
//     SHOP_REQUEST_HEADERS,
//     (shopResponse) => {
//       const { storefront_access_tokens = [] } = JSON.parse(shopResponse) || {};
//       const { access_token } = storefront_access_tokens[0] || {};

//       storeFrontAccessToken = access_token;
//       isAllProductInSalesChannelListing
//         ? (
//           res.redirect('/home')
//         )
//         : (
//           res.redirect('/get_all_products')
//         );
//     }
//   );
// });
// //#endregion

// //#region get all products in store
// app.get('/get_all_products', (req, res) => {
//   console.log(5);
//   GET(
//     request,
//     null,
//     `${adminShopRequestUrl.replace('{{path}}', PATHES.Products)}?fields=id`,
//     SHOP_REQUEST_HEADERS,
//     (shopResponse) => {
//       const { products = [] } = JSON.parse(shopResponse) || {};

//       res.redirect(`/add_all_products_to_sales_channel?ids=${ products.map(p => p.id).join(',') }`);
//     }
//   );
// });
// //#endregion

// //#region add products to new sales channel product listing
// app.get('/add_all_products_to_sales_channel', (req, res) => {
//   console.log(6);
//   const { ids } = req.query;

//   ids.split(',').forEach(element => {
//     PRODUCT_LISTING_BODY.product_listing.product_id = element;
//     PUT(request, null, adminShopRequestUrl.replace('{{path}}', PATHES.ProductListingForCreate).replace('{{product_listing_id}}', element), PRODUCT_LISTING_BODY, SHOP_REQUEST_HEADERS);
//   });

//   isAllProductInSalesChannelListing = true;
//   res.redirect('/home');
// });
// //#endregion

// ['32648986724', '32649117796'].forEach(item => DELETE(request, null, `https://e-boxsecure.myshopify.com/admin/script_tags/${ item }.json`, shopRequestHeaders));

//#endregion
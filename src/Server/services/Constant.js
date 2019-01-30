
import dotenv from 'dotenv';

dotenv.config();

export const API_KEY = process.env.SHOPIFY_API_KEY;
export const API_SECRET = process.env.SHOPIFY_API_SECRET_KEY;
export const SCOPES = 'read_themes , read_products, read_script_tags, write_script_tags, read_checkouts, write_checkouts, read_product_listings, write_product_listings, unauthenticated_read_product_listings, unauthenticated_write_checkouts';
export const FORWARDING_ADDRESS = 'https://0f77156c.ngrok.io';
export const CDN_BASE_URL = 'https://ilgol.github.io/shopify';
export const SCRIPT_TAG_BODY = {
  script_tag: {
    event: 'onload',
    src: `${ CDN_BASE_URL }/Button/main.js`,
  },
};
export const STOREFRONT_ACCESS_TOKEN_BODY = {
  storefront_access_token: {
    title: 'Token',
  },
};
export const PRODUCT_LISTING_BODY = {
  product_listing: {
    product_id: '',
  },
};
export const SHOP_REQUEST_HEADERS = {
  'X-Shopify-Access-Token': '',
  'Accept': 'application/json',
};
export const SHOP_REQUEST_URL = `https://{{shop}}/{{path}}.json`;
export const ADMIN_SHOP_REQUEST_URL = `https://{{shop}}/admin/{{path}}.json`;
export const PATHES = {
  OAuth: 'oauth/access_token',
  SriptTag: 'script_tags',
  StoreFrontAccessToken: 'storefront_access_tokens',
  Products: 'products',
  ProductListingForCreate: 'product_listings/{{product_listing_id}}',
  ProductListingForGet: 'product_listings',
  CheckOut: 'checkouts',
  CheckOutWithToken: 'checkouts/{{token}}',
  Assets: 'assets',
  Cart: 'cart',
  ShippingRates: 'checkouts/{{token}}/shipping_rates',
};
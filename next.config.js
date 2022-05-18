// next.config.js
module.exports = {
    images: {
      domains: ['links.papareact.com','a0.muscache.com','images.unsplash.com','cf.bstatic.com','dynamic-media-cdn.tripadvisor.com','media-cdn.tripadvisor.com','www.plurielle.ma'],
    },
    env:{
      mapbox_key: 'pk.eyJ1IjoieW5hamk4MCIsImEiOiJja3Rhd3dycjExanAyMnVwYzUyemk3ZGRiIn0.BTv8iC7xciBi6IZUZBNQmg',
      stripe_public_key: process.env.STRIPE_PUBLIC_KEY
    }
  }

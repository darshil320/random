'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
bootstrap(/*{ strapi }*/) {
  const fs = require("fs");
  const data = JSON.parse(fs.readFileSync("./data/input.json", "utf-8"));

  data.forEach(async (entry) => {
    await strapi.entityService.create("api::blog.blog", {
      data: {
        title: entry.title,
        author: entry.author,
        content: entry.content,
      },
    });
  });
}

};

// bootstrap(/*{ strapi }*/) {
//   const fs = require("fs");
//   const data = JSON.parse(fs.readFileSync("./data/input.json", "utf-8"));

// const axios = require('axios');
// const FormData = require('form-data');

// data.forEach(async (entry) => {
//   let content = entry.content;

//   // regex to match image URLs
//   let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
//   let matches = content.match(regex);

//   for (let match of matches) {
//     let response = await axios.get(match, { responseType: 'arraybuffer' });
//     let buffer = Buffer.from(response.data, 'utf-8');


//     let formData = new FormData();
//     formData.append('files', buffer, { filename: 'image.jpg' });

//     let result = await strapi.plugins['upload'].services.upload.upload({
//       data: {},
//       files: formData
//     });

//     // replace image URL in content with URL of uploaded image
//     content = content.replace(match, result[0].url);
//   }

//   // create new entry in Strapi with updated content
//   await strapi.entityService.create("api::blog.blog", {
//     data: {
//       title: entry.title,
//       author: entry.author,
//       content: content,
//     },
//   })
// })}}
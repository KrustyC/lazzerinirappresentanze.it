# lazzerinirappresentanze.it
Source code for the website https://lazzerinirappresentanze.it

This website is developed for Lazzerini Rappresentanze, as a marketing website.

## Architecture
This website is developed using [Gatsby](https://www.gatsbyjs.org/) in sync with [Netlify](https://www.netlify.com) and [Netlify CMS](https://www.netlifycms.org/).
This website uses Netlify CMS as a headless CMS, to let the final customer being able to modify the copy and content of the website, without any input from the developer. All the content types available are configured in `static/admin/config.yml`. The content is managed through Netlify CMS, which automatically pushes the code to GitHub on each published, which in turn generate a new build process on Netlify.

## Contribution

As this is a website for a company, contributions will only be accepted in accordance with the company (Lazzerini Rappresentanze) itself.

## 💫 Deploy
This website is deployed through Netlify, on each push or merge into master. Netlify CMS also deploys all the text changes to the `content` folder.
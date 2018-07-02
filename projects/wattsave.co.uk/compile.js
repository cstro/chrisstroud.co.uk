var handlebars = require('handlebars')
var layouts = require('handlebars-layouts')
var fs = require('fs')

// Register helpers
handlebars.registerHelper(layouts(handlebars))

// Register partials
handlebars.registerPartial('layout', fs.readFileSync('src/layout.hbs', 'utf8'))

var indexTemplate = handlebars.compile(fs.readFileSync('src/pages/index.html', 'utf8'))
const index = indexTemplate({
  title: 'Home',
  items: [
    'apple',
    'orange',
    'banana'
  ]
})

var aboutTemplate = handlebars.compile(fs.readFileSync('src/pages/about.html', 'utf8'))
const about = aboutTemplate({title: 'About'})

var contactTemplate = handlebars.compile(fs.readFileSync('src/pages/contact.html', 'utf8'))
const contact = contactTemplate({title: 'Contact'})

const pages = {
  'public/index.html': index,
  'public/about.html': about,
  'public/contact.html': contact,
}

Object.entries(pages).map(([path, template]) => {
  fs.writeFile(path, template, function (err) {
    if (err) {
      console.log(err)
    }
    console.log(`${path} created`)
  })
})
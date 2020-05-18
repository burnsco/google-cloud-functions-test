const puppeteer = require('puppeteer')

async function getAnime() {
  const browser = await puppeteer.launch({
    headless: false,
  })

  const page = await browser.newPage()

  const url = 'https://nyaa.si/?s=seeders&o=desc'

  await page.goto(url)
  await page.waitFor('.success')

  const results = await page.$$eval('.success', (rows) => {
    return rows.map((row) => {
      const properties = {}
      const titleEl = row.querySelector(
        '.success' > 'td:nth-child(2)' > 'a:nth-child(2)',
      )
      properties.title = titleEl.innerText
      properties.url = titleEl.getAttribute('href')
      return properties
    })
  })
  console.log(results)
}

getAnime()

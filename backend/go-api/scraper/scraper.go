package main

import (
	"fmt"
	"log"

	"github.com/gocolly/colly"
)

func main() {

	var url string = "https://www.megamillions.com/Winning-Numbers.aspx"
	fmt.Println("Scraping MegaMillions Cash Prize..")
	c := colly.NewCollector()
	c.AllowedDomains("https://www.megamillions.com","megamillions.com"),

	err := c.Visit(url)
	if err != nil {
		log.Printf("failed to visit url: %v\n", err)
		return
	}

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting: ", r.URL)
	})

	c.OnError(func(_ *colly.Response, err error) {
		log.Println("Something went wrong: ", err)
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Println("Page visited: ", r.Request.URL)
	})

	c.OnScraped(func(r *colly.Response) {
		fmt.Println(r.Request.URL, " scraped!")
	})

	c.OnHTML("span", func(e *colly.HTMLElement) {
		// ...
		fmt.Printf("%v", e.Text)
	})

}

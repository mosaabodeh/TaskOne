describe("vesit Website",()=>{
    it("should create a new website with default parameters",()=>{
       cy.viewport('iphone-6+') 
       cy.visit("/")
        //to find element by id use #
        //to find element by class name use . ex class name="list1 web" ==>'.list1.web'
        //to find element by tagname use [] ex name="developer"==> '[name="developer"]'
        //attrebute like : name type value id class any thing like this 
        //to find element first use cy.get('h1').first() For Last use last()
        //to find element by index we can use cy.get('h').eq(0);//its zero index
        //to find element by text we can use cy.contains('Appium)
        //to type we can use tupe command but to hit enter we use this : cy.get('email').type('Ali{enter}')
        //force=true اذا اشي هيدن بقدر اعمل اكسيس عليه هيك 
        //delay:1000 to delay the typing time between each letter
        //to select : .select('cypress')or select(1)
        //checkbox or rediobutton we can use command : .check() or Uncheck()
        //for Doubleclick use : dbclick
        //for rightclicl use : .rightcliclk()
        //should be vesable: should('be.vesible')
        //to sure text exists : .should('have.text',"ana hello")
        //لما بدنا نتاكد من انها بتحتوي علىى جزء من التيكست 
        //should('contain','mosaab odeh')
        //to ensure css we can use .should('have.css','background','rgb(123,1,1)')

        
    })
})
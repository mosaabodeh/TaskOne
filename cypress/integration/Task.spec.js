describe("Log in to our app", () => {
    before("Log in to the website", () => {
        cy.visit('/');

        cy.get('#email').type('Sulaiman.salah'); 
        cy.get('[name="password"]').type('12341234{enter}');
 
    });

    it("Should have the user's name displayed on the dashboard", function() {
        cy.get('#user-name-navbar', { timeout: 6000 }).should('be.visible').invoke('text').then((returnedText) => {
            expect(returnedText).to.contain('سليمان صلاح');
        });
    });
});
describe('Verify the placeholder text ',()=>{
    it("Should have 'Share what's on your mind' displayed at the top", function() {
        cy.get('.top > textarea')
          .should('be.visible')
          .and('have.attr', 'placeholder', "Share what's on your mind").click();
    });

    describe("write on the text box",()=>{
        it("Verify that if the user is able to click on the text field to start writing ",()=>{
            cy.get('#post-text')
            .should('be.visible')
            .and('not.be.disabled')
            .click();
        })

        it("Should have 'Share what's on your mind' displayed at the top", function() {
            cy.get('#post-text')
              .should('be.visible')
              .and('have.attr', 'placeholder', "Share what's on your mind");
        });

        it("Verify that should be able to type in the text field area", function() {
            const inputText = "Hello, Iam here";

            cy.get('#post-text') 
            .type(inputText) 
            .should('have.value', inputText);
             
        });
        it("Verify that should be able to type in the text field area", function() {
            cy.get('#post-text').clear().type('mosaab1@$%`|').should('have.value', 'mosaab1@$%`|');
             
        });
        it("verfiy the ability of allowing the user copy and paste in the input field", function() {
            let inputText = "Mosaab";

            cy.get('#post-text').clear().type(inputText).should('have.value', inputText);        
            cy.get('#post-text').trigger('keydown', { key: 'c', ctrlKey: true }); 

            cy.get('#post-text') 
              .click()
              .trigger('keydown', { key: 'v', ctrlKey: true }); 
                    
            cy.get('#post-text').should('have.value', inputText); 
        });
        
        it("Should enforce the maximum character limit on the text box 1000", function() {
            const inputText = "This is a test input with more than 50 characters. This text should not be accepted.";        
            
            cy.get('#post-text')
              .clear() 
              .type(inputText) 
              .should('have.value', 'This is a test input with more than 50 char'); 
        
            cy.get('#post-text')
              .type('LongLongMax') 
              .should('have.value', 'This is a test input with more than 50 char'); 
        
            cy.get('#post-text').should('have.attr', 'maxlength', '1000');
        });

       
        it("Verify that the user should not be able to enter HTML code", function() {
            const htmlInput = '<h1>hello world<h1>';
        
            cy.get('#post-text')
              .clear()
              .type(htmlInput); 
        
              cy.get('.share-to-dropdown.dropdown-menu.tooltip-popup.ng-scope')
                .find('li').first() 
                .click({force: true});
        
            cy.get('.primary-button.ng-binding').click();
        
            cy.get('.html-content-text.break-word.ng-isolate-scope')
            .first() 
            .invoke('text') 
            .then((text) => {
              
              cy.log(text);
              
             
              cy.get('.html-content-text.break-word.ng-isolate-scope')
                .first() 
                .should('not.contain', '<h1>hello world<h1>') 
                //fail it dosnt post the h1 and put midelare attak
            
            });    
        })

        it("Verify that the user should not be able to enter Java script code", function() {
            const jsInput = '<script>alert("Hack");</script>';
        
            cy.get('#post-text')
              .clear()
              .type(jsInput);
        
              cy.get('.share-to-dropdown.dropdown-menu.tooltip-popup.ng-scope')
                .find('li').first() 
                .click({force: true});
        
            cy.get('.primary-button.ng-binding').click();
        
            cy.get('.html-content-text.break-word.ng-isolate-scope')
            .first() 
            .invoke('text') 
            .then((text) => {
              
              cy.log(text);
              
             
              cy.get('.html-content-text.break-word.ng-isolate-scope')
                .first() 
                .should('not.contain', '<script>alert("Hack");</script>') 
                //fail it dosnt post the h1 and put midelare attak
            
            });    
        });
               

        it('Verify that the user cant make the SQL INJECTION ',()=>{
            const sqlInput = 'SELECT * FROM users';
        
            cy.get('#post-text')
              .clear()
              .type(sqlInput);
        
              cy.get('.share-to-dropdown.dropdown-menu.tooltip-popup.ng-scope')
                .find('li').first() 
                .click({force: true});
        
            cy.get('.primary-button.ng-binding').click();
        });
         
    })
   
    
    describe('Verify Posting to Dropdown Functionality ',()=>{
        describe('Dropdown Menu Test', () => {
            it('should click on each li element in the dropdown', () => {
            
              cy.get('.dropdown-toggle').first().click();
                cy.get('.share-to-dropdown.dropdown-menu.tooltip-popup.ng-scope').should('be.visible');
                cy.get('.dropdown-toggle').first().click();
            });

          });

          it('Validate successfully selecting the : "Building A "And deselect all', () => {
            cy.get('.share-to-dropdown.dropdown-menu.tooltip-popup.ng-scope')
            .find('li').first() 
            .click({force: true});
                cy.get('.posting-to-tooltip > .share-to')
                .should('contain', 'Building A');
          });

          it('Validate successfully selecting the : "Groups "And deselect all', () => {
            cy.get('.share-to-dropdown.dropdown-menu.tooltip-popup.ng-scope')
            .find('li').eq(1) 
            .click({force: true});
                cy.get('.posting-to-tooltip > .share-to')
                .should('contain', 'Groups');
               
                cy.get('.k-input.k-readonly', { timeout: 10000 }) 
                .should('be.visible') 
               .invoke('val')
               .then((returnedText) => {
                 expect(returnedText.toLowerCase()).to.contain('search for a group or list');
               }) 

          });

          it('Validate successfully selecting the : "Courses"And deselect all', () => {
            cy.get('.share-to-dropdown.dropdown-menu.tooltip-popup.ng-scope')
            .find('li').eq(2) 
            .click({force: true});
                cy.get('.posting-to-tooltip > .share-to')
                .should('contain', 'Courses');

                cy.get('.k-input.k-readonly', { timeout: 10000 }) 
                 .should('be.visible') 
                .invoke('val')
                .then((returnedText) => {
                  expect(returnedText.toLowerCase()).to.contain('search for a course or list');


  });

          });

          it('Validate successfully selecting the : "Classes" And deselect all', () => {
            cy.get('.share-to-dropdown.dropdown-menu.tooltip-popup.ng-scope')
            .find('li').eq(3) 
            .click({force: true});
                cy.get('.posting-to-tooltip > .share-to')
                .should('contain', 'Classes');

                cy.get('.k-input.k-readonly', { timeout: 10000 }) 
                .should('be.visible') 
               .invoke('val')
               .then((returnedText) => {
                 expect(returnedText.toLowerCase()).to.contain('search for a class or list');
               })
          });

          it('Validate successfully selecting the : "Member" And deselect all', () => {
            cy.get('.share-to-dropdown.dropdown-menu.tooltip-popup.ng-scope')
            .find('li').eq(4) 
            .click({force: true});
                cy.get('.posting-to-tooltip > .share-to')
                .should('contain', 'Member');

                cy.get('.k-input.k-readonly', { timeout: 10000 }) 
                .should('be.visible') 
               .invoke('val')
               .then((returnedText) => {
                 expect(returnedText.toLowerCase()).to.contain('search for a member or list');
               })

                });


        })
                

        describe('Verify Recipients Dropdown Functionality ',()=>{
            it('Validate multiple selection on the Recipients Dropdown ',()=>{
                cy.get('.share-to-name span.ng-binding').each(($span, index) => {
                    const expectedTexts = ['Teachers', 'Students', 'Parents'];
                    cy.wrap($span).should('contain', expectedTexts[index]); 
                  });
               
            })
            it('should click on each li element in the dropdown', () => {
            
                cy.get('.dropdown-toggle').eq(1).click();
                    
                 cy.get('.share-to-dropdown.dropdown-menu.tooltip-popup.ng-scope').eq(1)
            .find('li').eq(1) 
            .click({force: true});

            cy.get('.share-to-dropdown.dropdown-menu.tooltip-popup.ng-scope').eq(1)
            .find('li').eq(1)
            .should('not.have.class', 'selected')

            
            })
        })
    
  
    describe('Search Input',()=>{
       it(" Confirm that The search input is visible  ",()=>{
           cy.get('.k-input.k-readonly', { timeout: 10000 }) .click()
           .should('be.visible') 
          
       })

       it('Confirm the search less than 3 characters input ',()=>{
         cy.get('.k-input').type('ال')
        
         cy.get('#6d92e596-02ef-40f7-949e-ed9611971961-list')
        .find('li')
        .first()
        .invoke('text')
        .should('equal', 'الرياضيات');
       })


       it('search by valid data',()=>{
         cy.get('.k-input').clear().type('الصف الثالث د اللغة العربية')
       })

       it('validite the vailid search',()=>{
    
     cy.get('.k-input')
   .focus()
   .clear()
   .type('الصف الثالث د اللغة العربية', { delay: 100 })
   .trigger('input') 
   .trigger('change')
   .should('have.focus'); 

   cy.wait(4000);

 const selectedItems = [];
 cy.contains('#6cb18d50-3b71-407e-bafd-0e9fd1545304-list', { timeout: 10000 })//the result dosnt display at automation ):
   .eq(0)
   .focus()  
   .then(($el) => {
     selectedItems.push($el.text());
   });

 cy.get('.k-list.k-reset li').eq(1).then(($el) => {
   selectedItems.push($el.text()); 
 });

 cy.get('.k-list.k-reset li').eq(2).then(($el) => {
   selectedItems.push($el.text()); 
 });


 cy.then(() => {
   cy.log('Selected Items:', selectedItems);
   expect(selectedItems).to.deep.equal([     'الصف الثالث د اللغة العربية',
     'الصف الاول n اللغة الانجليزية',
     'الصف الاول n الرياضيات',
   ]);
 });

    })
    it('Search in arabic and english',()=>{
    cy.get('.k-input').clear().type('teال')
    const selectedItems = [];
 cy.contains('#6cb18d50-3b71-407e-bafd-0e9fd1545304-list', { timeout: 10000 })//The resut dosnt display at automation ):
   .eq(0)
   .focus()  
   .then(($el) => {
     selectedItems.push($el.text());
   });

    cy.get('.k-list.k-reset li').eq(1).then(($el) => {
   selectedItems.push($el.text()); 
  });

    cy.get('.k-list.k-reset li').eq(2).then(($el) => {
   selectedItems.push($el.text()); 
    });
 
    cy.then(() => {
      cy.log('Selected Items:', selectedItems);
      expect(selectedItems).to.deep.equal([     'الصف الثالث د اللغة العربية',
        'الصف الاول n اللغة الانجليزية',
        'الصف الاول n الرياضيات',
      ])
    });

    it('Search about something doesnt exist in db',()=>{
      cy.get('.k-input').clear().type('rrrrrrrrrrr!@#$%');
      cy.get('.k-list.k-reset li').should('not.be.visible');//the result dosnt display at automation

    })

    it('Search using uppercase or lower case',()=>{
      cy.get('.share-to-dropdown.dropdown-menu.tooltip-popup.ng-scope')//the result dosnt display so it fails when
      .find('li').eq(4) 
      .click({force: true});
          cy.get('.posting-to-tooltip > .share-to')
          .should('contain', 'Member');
      cy.get('.k-input').clear().type('TEST');
      cy.get('.k-list.k-reset li').should('be.visible');
    })
    it('Verify that the user can search for something contains non-ALphpitic',()=>{
      cy.get('.share-to-dropdown.dropdown-menu.tooltip-popup.ng-scope')//the result dosnt display at automation
            .find('li').eq(4) 
            .click({force: true});
                cy.get('.posting-to-tooltip > .share-to')
                .should('contain', 'Member');
      cy.get('.k-input').clear().type('المدير ..كمال');
      cy.get('.k-list.k-reset li').should('be.visible');
    })

   })
         

  describe('Check the redio button ',()=>{
   
    it('should be able to select redio button',()=>{
      cy.get('.edb-radio-btn-group')
      .contains('.title', 'Read only')
      .parent()
      .find('[ng-click]')
      .click()
      .should('have.attr', 'style', 'fill:none');
       })


       it('should be able to select redio button',()=>{
     
    cy.get('.edb-radio-btn-group')
    .contains('.title', 'Read only') 
    .parent() 
    .find('[ng-click]') 
    .click() 
    .should('have.attr', 'style', 'fill');
         })
       
  })

  it('Verify the upload button or link should be clickable.',()=>{
    cy.get('#ic_image_upload').should('be.visible')
  })

describe('Verify the Attatched Functionality',()=>{

 it('Verify the upload button or link should be clickable.',()=>{
  cy.get('#ic_image_upload').should('be.visible')
})

it('Verify on click on the Upload button window should be open to select the file.',()=>{
  cy.get('#ic_image_upload').click({force: true});
})
it('Verify upploading file',()=>{
  cy.get('[ngf-select="handelFileUpload($file)"]')//theres no file type check
  .first()
  .attachFile({
    filePath: 'sample.txt',
    force: true,
  });
})

it('Verify user can uload file ',()=>{
  cy.get('[ngf-select="handelFileUpload($file)"]').first().selectFile('sample.txt', { force: true });//Theres no file type 

})

it('should show an error message when the file type is not allowed', () => {

  const fileName = 'test-file.exe';  
  const filePath = 'path/to/your/files/' + fileName; 

  cy.get('input[type="file"]').attachFile(filePath);//Thers no input File so it give error we have an image 

  cy.get('.error-message')  
    .should('be.visible')
    .and('contain', 'File type is not allowed');  
});


})

})
})

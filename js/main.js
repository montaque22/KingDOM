(function(){

    // $('#start-profile').on('click',function(){
    //     var kingdom = new Kingdom(new Citizen('ul', null, 'className:root level-0'));
    //     var subject = kingdom
    //         .addChild(new Citizen('h1', 'Top Level', 'className:level-0'))
    //         .gotoChildAtIndex(0)
    //         .addChild(new Citizen('li', null, 'className:level-1'))
    //         .addChild(new Citizen('li', null, 'className:level-1'), true)
    //         .addChild(new Citizen('ul', null, 'className:level-2-root'), true)
    //         .addChild(new Citizen('li', null, 'className:level-3'))
    //         .addChild(new Citizen('li', 'This is level 3', 'className:level-3'))
    //         .parent()
    //         .addChild(new Citizen('li', function(){
    //             var frag = document.createDocumentFragment();
    //             frag.appendChild(document.createTextNode('This is'));
    //             frag.appendChild(document.createElement('br'));
    //             frag.appendChild(document.createTextNode('level 2'));
    //             return frag;
    //         }, 'className:level-2'))
    //         .parent()
    //         .addChild(new Citizen('li', 'This is level 1', 'className:level-1'));
    //
    //
    //     $('body').append(subject.generate(true));
    // })



    $('#start-profile').on('click',function(){
        // var kingdom2 = new Kingdom({
        //     element: 'div',
        //     properties:{
        //         className:'title'
        //     }
        // });
        // subject = kingdom2
        //     .addSubject({
        //         element: 'h1',
        //         textAsString: 'KingDOM JS'
        //     })
        //     .addSubject({
        //         element: 'p',
        //         textAsString: 'This plugin allows you to create and insert virtual elements easily and quickly into' +
        //         ' the DOM',
        //         properties:{
        //             className:'text'
        //         }
        //     })
        //     .addSubject({
        //         element: 'a',
        //         textAsString: 'Click here to learn more',
        //         properties:{
        //             className:'cta',
        //             href:'#'
        //         }
        //     })


        var kingdom2 = new Kingdom();
        var subject = kingdom2.addSubject({
            element: 'div',
            textAsHTML: '<span> awesome </span>',
            properties:{
                onclick: function(){
                    console.log('hello');
                },
                dataset:{hello:'me'}
            },
            setAttribute:{
                id:'times',
                'days-in-power': 1
            }
        },true)
            kingdom2.addSubject({
                element:'span',
                textAsString: 'nice'
            });

        var DOM = kingdom2.buildKingdom();

        $('body').append(DOM)
    })


})();


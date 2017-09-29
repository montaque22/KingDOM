var kingdom = null;
const KING = {
    element: 'div',
    textAsHTML: '<span> I am the KING! </span>',
    setAttributes:{
        'class': 'king lord item'
    }
}
const SUBJECT = {
    element: 'div',
    textAsHTML: '<span> I am your loyal subject! </span>',
    setAttributes:{
        'class': 'subject item'
    }
}

const SUBJECT_LORD = {
    element: 'div',
    textAsHTML: '<span> I am your loyal subject, but I too rule! </span>',
    setAttributes:{
        'class': 'subject lord item'
    }
}

$('#king').on('click',function(){
    $('#menus').show();
    $('.king-btn').hide();
    kingdom = new Kingdom({...KING});
    updateObjectGraph(kingdom.createBlueprint())

});

$('#subject').on('click',function(){
    kingdom = kingdom.addSubject({...SUBJECT});
    updateObjectGraph(kingdom.createBlueprint())
});

$('#subject-lord').on('click',function(){
    kingdom = kingdom.addSubject({...SUBJECT_LORD}, true);
    updateObjectGraph(kingdom.createCensus())
});

$('#render').on('click',function(){
    $('#kingdom').html(kingdom.buildKingdom());
});

$('#clear').on('click',function(){
    $('#menus').hide();
    $('.king-btn').show();
    $('#kingdom').html('');
    kingdom = null;

    updateObjectGraph('')

});

function updateObjectGraph(object){
    $('.object-map').html(object.escape());
}

String.prototype.escape = function() {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};

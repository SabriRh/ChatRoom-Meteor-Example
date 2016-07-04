Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {

  

  Template.test.helpers({
    messages: function () {
      return Messages.find({});
    }
  }); 

  Template.test.events({
    'click button': function (e,template) {


      	var value = template.find('textarea').value;
        console.log('**'+value);
      	template.find('textarea').value='';
        var date=moment(new Date()).format('h:mm a');

      	Messages.insert({
      		'message':value,
      		'date': date,
      		'user': Meteor.user().emails[0].address
      	});

      
    }
  });

Template.test.events({
    'keydown textarea': function (e,template) {

      
if(e.keyCode ==13){
  var value = template.find('textarea').value;
        console.log('message : '+value);
        template.find('textarea').value='';
        var date=moment(new Date()).format('h:mm a');

        Messages.insert({
          'message':value,
          'date': date,
          'user': Meteor.user().emails[0].address
        });

}
        

      
    }
  });

Template.test.events({
    'click .shot': function (e,template) {
      

var optionsCam = {
width:800,
height:600
};
      

MeteorCamera.getPicture(optionsCam,function(err,data){

if(!err){

  var date=moment(new Date()).format('h:mm a');

Messages.insert({
          'photo':data,
          'date': date,
          'user': Meteor.user().emails[0].address
        });

}

})

        
      
    }


  });



}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

}

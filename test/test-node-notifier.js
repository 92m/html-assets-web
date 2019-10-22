const Growl = require('node-notifier').Growl;
 
var notifier = new Growl({
  name: 'Growl Name Used', // Defaults as 'Node'
  host: 'localhost',
  port: 23053
});
 
notifier.notify({
  title: 'Foo',
  message: 'Hello World',
  wait: false, // Wait for User Action against Notification
 
  sticky: false,
  label: void 0,
  priority: void 0
});
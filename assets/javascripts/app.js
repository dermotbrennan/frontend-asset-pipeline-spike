import HelloManager from './hello_manager';

console.log('JS is running!');
// export module 'app' {
// function main() {
  $(document).ready(function() {
    $('body').append("jQuery is running!");

    var hello_manager = new HelloManager();
    console.log(hello_manager.getMessage());
    $('body').append(`Message: ${hello_manager.getMessage()}`);
  });
// }

// export default main

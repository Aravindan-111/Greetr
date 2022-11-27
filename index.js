const a = G$('john', 'doe');

//a.greet().setLang('es').greet(true);

$("#login").click(function() {

  let loginGrtr = G$('John', 'Doe');

  $("#logindiv").hide();

  loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
})
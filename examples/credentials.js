
let client_id, client_secret, pathCert; //NÃO PREENCHER AQUI

let sandbox = false; // DEFINA SE ESÁ UTILIZANDO AMBIENTE DE DESENVOLVIMENTO (TRUE) OU PRODUÇÃO (FALSE)

if(sandbox){
	//  INSIRA ABAIXO SUAS CREDENCIAIS DE DESENVOLVIMENTO E SEU CERTIFICADO
	client_id = "";
	client_secret = "";
	pathCert = "";
}else{
	//  INSIRA ABAIXO SUAS CREDENCIAIS DE PRODUÇÃO E SEU CERTIFICADO
	client_id = "";
	client_secret = "";
	pathCert = "";
}


module.exports = {
	"sandbox": sandbox,
	"client_id": client_id,
	"client_secret": client_secret,
	"pathCert": pathCert,
}
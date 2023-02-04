function getNumeroAleatorio(max) {
    return Math.floor(Math.random() * max);
}

$(document).ready(function(){

    $("#confirmaNome").click(function(){
        console.log($("#nome").val());
        if($("#nome").val() != "Mariana Aysha Dehon Carneiro"){
            alert('Então você não deveria estar acessando este site. Vaza!');
            window.location.href='https://www.youtube.com/watch?v=bytgIg02P8k';
        }  else {
            mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
        }
    });

    let vezesNao = 0;
    $("#nao").click(function(){
        if(vezesNao++ >= 10){
            alert('Se vc não quer tanto assim. Então, adeus!');
            window.location.href='https://youtu.be/bg13nNe2qG4';
        }

        $("#nao").css("position", "absolute");
        $("#nao").css("top", getNumeroAleatorio(200));
        $("#nao").css("left", getNumeroAleatorio(250));
    });

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 3){
            var audio = new Audio('assets/musica1.mp3');
            audio.volume = 0.025;
            audio.play();
        } else if (nova == 6){
            var audio = new Audio('assets/musica2.mp3');
            audio.volume = 0.025;
            audio.play();
        }
        
    }
    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }
});

let telaFinal = false;
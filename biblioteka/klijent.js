$(document).ready(function(){
    //prikazivanje
    $('#unosKnjige').click(function(){
        $('#unosK').slideToggle(1000);
    });

    $("#pretraziknjige").click(function(){
        $("#pretraziK").slideToggle(1000)
    });

    $("#obrisiKnjige").click(function(){
        $("#obrisiK").slideToggle(1000)
    });

    //POST method
    $('#formUnos').submit(function(){
        let knjiga = $('#knjiga').val();
        let autor = $("#autori").val();

        if(knjiga === ''){
            $('#rezultat').text("morate uneti naziv knjige").css("color", "red");
            return false;
        }
        if(autor === ''){
            $("#rezultat").text("Morate uneti autora").css("color", "blue");
            return false;
        }
        // console.log("Ovde!");
        $.ajax(`http://localhost:3000/knjige`, {
            method: "POST",
            data:{
                knjiga, 
                autor
            },
            success: function(data){
                console.log("napravljeno");
                if(data.hasOwnProperty("kreirano")){
                    let kreirano = data.kreirano;
                    $('#rezultat').html(`<p>Knjiga: ${kreirano.knjiga}<br> Autora: ${kreirano.autor} <br> D</p>`)
                    .css("color", "green");
                }
            },
            error: function(){
                $("#rezultat").text("Greka pri postavljanju")
                .css("color", "red");
            }
        });
        return false;
    });

    //GET method
    $("#formPretrazi").submit( function(){
        let pretrazi = $("#pretrazi").val();
   // $("#rezultat").text(`eto ga${pretrazi}`);
        if(pretrazi === ""){
            $.ajax('http://localhost:3000/knjige', {
                method: 'GET',
                success: function(data){
                    console.log(`Success`);
                    if(data.hasOwnProperty('rezultat')){
                        let rezultat = data.rezultat;
                        if(rezultat.length === 0){
                            $("#rezultat").text("Nema informacija o knjigama");
                            return false;
                        }
                        
                        let tabela = "<table><caption>Spisak knjiga: </caption>";
                        tabela += "<tr><th>Knjiga:</th> <th>Atutor:</th></tr>";
                        for(let i=0; i<rezultat.length; i++) {
                            
                            tabela += "<tr><td>" + rezultat[i].knjiga + "</td>"
                                    + "<td>" + rezultat[i].autor + "</td>"
                                    +"</td></tr>";
                        }

                        tabela += "</table>";

                        $("#rezultat").text("").append(tabela).css("color", "green");
                    }
                    
                },
                error: function(){
                    $("#rezultat").text('greska pri dohvataju')
                    .css('color', 'red');
                }
            })
        }
        else{
            
            $.ajax(`http://localhost:3000/Knjige/autor/${pretrazi}`, {
                method: 'GET',
                success: function(data){
                    console.log(`Success`);
                    if(data.hasOwnProperty('rezultat')){
                        let rezultat = data.rezultat;
                        if(rezultat.length === 0){
                            $("#rezultat").text("Nema informacija o knjigama");
                            return false;
                        }
                        
                        let tabela = "<table><caption>Spisak knjiga: </caption>";
                        tabela += "<tr><th>Knjiga:</th> <th>Atutor:</th></tr>";
                        for(let i=0; i<rezultat.length; i++) {
                            
                            tabela += "<tr><td>" + rezultat[i].knjiga + "</td>"
                                    + "<td>" + rezultat[i].autor + "</td>"
                                    +"</td></tr>";
                        }

                        tabela += "</table>";

                        $("#rezultat").text("").append(tabela).css("color", "green");
                    }
                    
                },
                error: function(){
                    $("#rezultat").text('greska pri dohvataju')
                    .css('color', 'red');
                }
            })    

        }
        return false;
    })


    //DELETE method
    $("#formObrisi").submit(function(){
        let promObrisi = $("#obrisi").val();
        if(promObrisi === ""){
            console.log("nema podataka o brisanju");
            $("#rezultat").text("morate uneti ime knjige!").css("color", "blue");
            return false;
        }
        else{
            $.ajax(`http://localhost:3000/knjige/${encodeURIComponent(promObrisi)}`, {
                method: "DELETE",
                success: function(data){
                    $("#rezultat").text("Uspesno obrisana knjiga!").css("color", "green");
                },
                error: function(){
                    $("#rezultat").text("doslo je do greske pri brisanju").css("color", "blue");
                }
            });
        }
    
        return false;
    });

});
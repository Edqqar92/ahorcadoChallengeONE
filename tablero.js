const canvas = document.querySelector('canvas');
const pincel = canvas.getContext('2d');
let palabras = ['Comedia', 'Perro', 'Ciego', 'Hola', 'Cerrajero', 'Lluvia'];

function game(){
    buttons = document.querySelectorAll('button');
    for (let i = 0; i <= buttons.length; i++){
        buttons[0].style.display = 'none';
        buttons[1].style.display = 'none';
        buttons[2].style.display = 'block';
    }
    document.querySelector('.espacio').style.display = 'none';
    document.querySelector('.canva').style.display = 'block';
    const palabra = randomWord();
    const ejeX = (canvas.width / 2) - (palabra.length * 30 / 2);
    const lettersWrong = [];
    const lettersRight = [];
    let alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    let loses = 0;

    pincel.clearRect(0,0,1000,600);
    pincel.beginPath();
    pincel.strokeStyle = 'black';
    pincel.rect(0,0,1000,600)
    pincel.stroke();

    var fondo = new Image();
    fondo.src = 'images/espacio.jpg';
    pincel.beginPath();
    fondo.onload = function(){
        pincel.drawImage(fondo, 0, 0, 1000, 600);

        pincel.beginPath();
        pincel.strokeStyle = 'white';
        pincel.moveTo(150, 350);
        pincel.lineTo(150, 75);
        pincel.moveTo(150, 75);
        pincel.lineTo(300, 75);
        pincel.moveTo(300, 75);
        pincel.lineTo(300, 100);
        pincel.stroke();

        pincel.beginPath();
        pincel.fillStyle = 'white';
        pincel.moveTo(150, 350);
        pincel.lineTo(100, 400);
        pincel.lineTo(200, 400);
        pincel.fill();

        createLines();
    }

    document.onkeydown = keyboard;

    var hearth = new Image();
    hearth.src = 'images/corazon.png';
    pincel.beginPath();
    hearth.onload = function(){
        for(loses; loses < 6; loses ++){
            pincel.drawImage(hearth, 650 + (loses * 35), 75, 25, 25);
        }
    }

    var rick = new Image();
    rick.src = 'images/alien.png';
    pincel.beginPath();
    rick.onload = function(){
        pincel.drawImage(rick, 650, 125, 210, 240);
    }

    function createLines(){
        let pos = ejeX;
        pincel.beginPath();
        for (let count = 0 ; count < palabra.length; count++){
            pincel.moveTo(pos, 450);
            pos = pos + 25;
            pincel.lineTo(pos, 450);
            pos = pos + 5;
        }
        pincel.stroke();
    };

    function keyboard(event){
        if (event.keyCode === 13){
            event.preventDefault();
        }
        if (event.keyCode < 91 && event.keyCode > 64){
            let keyPressed = String.fromCharCode(event.keyCode);
            const indexesFound = getIndexes(palabra, keyPressed);    
            if (indexesFound.length === 0){
                letterWrong(keyPressed);
                alphabet = alphabet.replace(keyPressed, '');
            } else {
                letterRight(keyPressed, indexesFound);
                alphabet = alphabet.replace(keyPressed, '');
            }
        } else {
            alert('Solo se permiten letras');
        }
    }

    function letterRight(keyPressed, indexesFound){
        if (alphabet.includes(keyPressed)){
            pincel.beginPath();
            for (let count = 0 ; count < indexesFound.length; count++) {
                lettersRight.push(indexesFound[count]);
                const pos = ejeX + (indexesFound[count] * 30);
                pincel.strokeStyle = 'rgba(0, 0, 0)';
                pincel.moveTo(pos, 450);
                pincel.lineTo(pos + 25, 450);
                pincel.stroke();
                pincel.beginPath();
                pincel.fillStyle = 'white';
                pincel.font = 'bold 25px "Gill Sans", sans-serif';
                pincel.textAlign = 'center';
                pincel.fillText(palabra[indexesFound[count]],pos + 13, 450);
                pincel.fill();
            }
            if (palabra.length === lettersRight.length){
                document.onkeydown = 'return false';
                setTimeout(() =>{
                    var apolo = new Image();
                    apolo.src = 'images/apolo.jpg';
                    pincel.beginPath();
                    apolo.onload = function(){
                        pincel.drawImage(apolo,  0, 0, 1000, 600);
                    }
                }, 600);
                setTimeout(() =>{
                    pincel.beginPath();
                    pincel.fillStyle = 'darkgreen';
                    pincel.font = 'bold 30px "Trirong", serif';
                    pincel.textAlign = 'center';
                    pincel.fillText('YOU WIN!!!',500, 200);
                    pincel.fill();
                }, 800);
            }
        } else {
            alert('No se puede repetir letra');
        }
    }

    function letterWrong(keyPressed){
        let ejex = (canvas.width / 2) - ((lettersWrong.length * 30) / 2);
        let ejey = 505;
        if (alphabet.includes(keyPressed)){
            lettersWrong.push(keyPressed);
            
            pincel.clearRect(170, 480, 660, 30);
            pincel.beginPath();
            for (let count = 0; count < lettersWrong.length; count++){
                const pos = ejex + (count * 30);
                pincel.fillStyle = 'white';
                pincel.font = '25px "Gill Sans", sans-serif';
                pincel.fillText(lettersWrong[count], pos, ejey);
                pincel.fill();
            }
            loses --;
            lost();

            if (loses >= 1){
                mortyHang(loses);
            } else {
                var legL = new Image();
                legL.src = 'images/legL.png';
                pincel.beginPath();
                legL.onload = function(){
                    pincel.drawImage(legL, 250, 252, 48, 110);
                };
                document.onkeydown = 'return false';
                setTimeout(() =>{
                    background();
                }, 1000);
                setTimeout(() =>{
                    pincel.beginPath();
                    pincel.fillStyle = 'white';
                    pincel.font = 'bold 25px "Audiowide", sans-serif';
                    pincel.textAlign = 'center';
                    pincel.fillText('GAME OVER!!!',canvas.width / 2, 400);
                    pincel.fill();
                    var gameover = new Image();
                    gameover.src = 'images/gameover.png';
                    pincel.beginPath();
                    gameover.onload = function(){
                        pincel.drawImage(gameover, 440, 200, 150, 150);
                    };
                }, 1200);
            }
        } else {
            alert('No puedes repetir la letra');
        }
        console.log(loses);
    }

    function lost(){
        let hearthBlack = new Image();
        hearthBlack.src = 'images/blackcorazon.png';
        pincel.beginPath();
        hearthBlack.onload = function(){
            pincel.drawImage(hearthBlack, 650 + (loses * 35), 75, 25, 25);
        }
    }

}

function addWord(){
    if (document.querySelector('input').value != ""){
        palabras.push(document.querySelector('input').value);
    }
    return document.querySelector('input').value = "";
}

function reset(){
    palabras = ['Comedia', 'Perro', 'Ciego', 'Hola', 'Cerrajero', 'Lluvia'];
    buttons = document.querySelectorAll('button');
    for (let i = 0; i <= buttons.length; i++){
        buttons[0].style.display = 'block';
        buttons[1].style.display = 'block';
        buttons[2].style.display = 'none';
    }
    document.querySelector('.espacio').style.display = 'block';
    document.querySelector('.canva').style.display = 'none';
};

document.querySelector('.start').addEventListener('click', game);
document.querySelector('.input').addEventListener('click', addWord);
document.querySelector('.reset').addEventListener('click', reset);

function randomWord(){
    const palabra = palabras[Math.floor(Math.random() * palabras.length)];
    return palabra.toUpperCase();
}

function getIndexes(palabra, letter){
    const indexes = [];
    for (let index = 0; index < palabra.length; index++){
        if (palabra[index] === letter){
        indexes.push(index); 
        }
    }
    return indexes;
}

function mortyHang(loses){
    if (loses === 5){
        var head = new Image();
        head.src = 'images/head.png';
        pincel.beginPath();
        head.onload = function(){
            pincel.drawImage(head, 255, 100, 90, 90);
        }
    }

    if (loses === 4){
        var body = new Image();
        body.src = 'images/body.png';
        pincel.beginPath();
        body.onload = function(){
            pincel.drawImage(body, 265, 186, 70, 70);
        }
    }

    if (loses === 3){
        var armR = new Image();
        armR.src = 'images/armR.png';
        pincel.beginPath();
        armR.onload = function(){
            pincel.drawImage(armR, 325, 188, 30, 85);
        }
    }

    if (loses === 2){
        var armL = new Image();
        armL.src = 'images/armL.png';
        pincel.beginPath();
        armL.onload = function(){
            pincel.drawImage(armL, 245, 185, 30, 90);
        }
    }

    if (loses === 1){
        var legR = new Image();
        legR.src = 'images/legR.png';
        pincel.beginPath();
        legR.onload = function(){
            pincel.drawImage(legR, 300, 252, 48, 110);
        }
    }
};

function background(){
    var fondo = new Image();
    fondo.src = 'images/espacio.jpg';
    pincel.beginPath();
    fondo.onload = function(){
        pincel.drawImage(fondo, 0, 0, 1000, 600);
    }  
}

function validar(elemento){
    let texto = elemento.value
    texto = texto.split(/[^A-Za-z\#\&]+/g)
    texto = texto.join("")
    elemento.value = texto
  }





const cols = document.querySelectorAll('.col');


document.addEventListener('keydown', e => {
    e.preventDefault()
    if (e.code.toLowerCase() === 'space'){
        setRandomColors();
    }

})


document.addEventListener('click', e => {
    const type = e.target.dataset.type
    if(type === 'lock') {
       const node = e.target.tagName.toLowerCase() === 'i'
        ? e.target
        : e.target.children[0];

        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    }else if (type === 'copy'){
        copyClipBoard(e.target.textContent)
    }

})


function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []
    cols.forEach((col, index) => {
    const text = col.querySelector('h1');
    const button = col.querySelector('button');
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    


    if(isLocked){
        colors.push(text.textContent);
        return
    } 

    const color = isInitial 
    ? colors[index] 
    ? colors[index] 
    : chroma.random()
    : chroma.random()
   
    if(!isInitial){
        colors.push(color);
    }

    col.style.background = color;
    text.textContent = color;
    setTextColor(text, color);
    setTextColor(button, color);
})

colorsLocationHash(colors)
};


function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function copyClipBoard(text) {
    return navigator.clipboard.writeText(text);
}


function colorsLocationHash(colors = []) {
    document.location.hash = colors.map((col) => {
        return col.toString().substring(1);
    }).join('-')
}

function getColorsFromHash() {
    if(document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map((color) => '#' + color)
    }
    return []
}


setRandomColors(true);
const buildTemplate = function(obj, templateHTML){
    const templateFn = new Function('obj', `return \`${templateHTML}\``)
    return templateFn(obj);
}

const template = {
    album: function(obj){
        return buildTemplate(obj, 
            `
        <div class="song-img-overlay-wrapper">
            <img class="song-img" src=${obj.imgSrc}>
            <div class="songs-img-overlay-wrapper">
                <a href="song-album-page.html?album-id=${obj.albumId}">
                    <div class="songs-img-overlay">
                        <div class="songs-img-overlay-endFont">
                            <div class="img-layout-font">
                                <svg class="font">
                            <use xlink:href="./img/icons.svg#share-node"></use>
                        </svg>
                            </div>
                            <div class="img-layout-font">
                                <svg class="font">
                            <use xlink:href="./img/icons.svg#dottedMenu-node"></use>
                        </svg>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div class="song-name-div">
            <p>${obj.albumName}</p>
            <span>${obj.artistNames}</span>
        </div>`
            )
    },
    artistalbumList: function(obj){
        return buildTemplate(obj, 
            `
            <div class="artist-img-div">
                <div class="artist-img-wrapper">
                    <img class="artist-img" src="${obj.imgSrc}">
                </div>
                <div class="songs-img-overlay-wrapper">
                    <a href="artists-topsong-albumpage.html?artis-id=${obj.artistId}">
                        <div class="artist-img-overlay"></div>
                    </a>
                </div>
            </div>
            <div class="artist-name-div">${obj.artistName}</div>
            `
            )
    },
    
    
    
}
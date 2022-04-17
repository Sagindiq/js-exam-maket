const parrotWraper = document.querySelector(".parrots-wrapper");
const favoriteList = document.querySelector(".favorite__list");

//add element

const addElement = function (tagName, className, content) {
    const addedElement = document.createElement(tagName);

    if (className) {
        addedElement.className = className;
    }

    if (content) {
        addedElement.textContent = content;
    }

    return addedElement
}

const appendChild = function (parent, child) {
    parent.append(child);
}

const localStorageSet = function () {
    const lStorage = localStorage.setItem("parrots", JSON.stringify(parrots));

    return lStorage
}

const showDate = function (datestring) {
    const date = new Date(datestring)

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

// const renderFavorite = function (favoriteArray) {

//     // const favoriteStar = document.querySelector(".favorite-star-img");
//     // favoriteStar.className = "fa-solid fa-star favorite-star-img";

//     // parrots.forEach(function(parrot){
//     //     if (parrot.is) {

//     //     }
//     // })


//     favorites.forEach(function (favorite) {

//         const favoriteItem = addElement("li", "card p-3 mb-2");
//         const favoriteTitle = addElement("h3", "card-title h5 mb-2", favorite.name);
//         const favoriteDelBtn = addElement("button", "btn btn-danger btn-sm d-inline", "Remove");
//         favoriteDelBtn.style = "width: fit-content";
//         favoriteDelBtn.type = "button";
//     })

// }

// renderFavorite()

// const refreshFavorite = function() {

//     parrots.forEach(function(parrot){
//         if (parrot.isFavorite == true) {
//             console.log("ishladi");
//         }
//     })
// }


const renderParrots = function (parrotArray) {
    const {
        id,
        title,
        img,
        birthDate,
        price,
        sizes,
        isFavorite,
        features
    } = parrotArray

    const parrotsTemplate = document.querySelector("#parrots-template");
    const parrotItem = parrotsTemplate.content.cloneNode(true);

    parrotItem.querySelector(".edit-button").setAttribute("data-id", id);
    parrotItem.querySelector(".delete-button").setAttribute("data-id", id);
    parrotItem.querySelector(".favorite-button").setAttribute("data-favorite-id", id);

    parrotItem.querySelector(".card-title").textContent = title;
    parrotItem.querySelector(".parrot-img").src = img;
    parrotItem.querySelector(".parrot-price").textContent = `$${price}`;
    parrotItem.querySelector(".parrot-w-h").textContent = `${sizes.width}sm x ${sizes.height}sm`;
    parrotItem.querySelector(".birth-date").textContent = showDate(birthDate);

    const featuresList = parrotItem.querySelector(".features-list");

    const featuresArray = features.split(",");

    featuresArray.forEach(function (fArray) {

        const featuresItem = addElement("li", "badge bg-primary me-1 mb-1", fArray);

        featuresList.append(featuresItem);
    });


    return parrotItem

}

let showParrot = parrots.slice()
const parrotCount = document.querySelector(".parrots-count");

const refreshParrot = function () {
    parrotWraper.innerHTML = "";

    parrotCount.textContent = `Count: ${showParrot.length}`;

    const parrotFragment = document.createDocumentFragment();
    showParrot.forEach(function (parrot) {
        const pItem = renderParrots(parrot);
        parrotFragment.append(pItem);
    })

    parrotWraper.append(parrotFragment);
    localStorageSet()

}

refreshParrot()

const addModal = document.querySelector("#add-parrot-modal");
const editModal = document.querySelector("#edit-parrot-modal");

const HideModal = new bootstrap.Modal(addModal);
const editHideModal = new bootstrap.Modal(editModal);


const addForm = addModal.querySelector("#add-form");
const addTitle = addModal.querySelector("#parrot-title");
const addImg = addModal.querySelector("#parrot-img");
const addPrice = addModal.querySelector("#price");
const addBirthDate = addModal.querySelector("#parrot-date");
const addWidth = addModal.querySelector("#parrot__width");
const addHeight = addModal.querySelector("#parrot__height");
const addFeatures = addModal.querySelector("#features");

//featuresValue kerak emas

// features 

featuresOptions = []
addFeatures.addEventListener("input", function () {
    const featuersValue = addFeatures.value;

    const splited = featuersValue.trim().split(",");

    if (splited.length == 2) {
        featuresOptions.push(splited[0]);
        addFeatures.value = "";
    }
});



addForm.addEventListener("submit", function (evt) {

    evt.preventDefault()

    const titleValue = addTitle.value;
    const imgValue = addImg.value;
    const priceValue = addPrice.value;
    const BirthValue = addBirthDate.value;
    const widthValue = addWidth.value;
    const heightValue = addHeight.value;

    const hasFeatures = featuresOptions.length !== 0;

    if (titleValue.trim() && imgValue && priceValue.trim() && BirthValue && widthValue.trim() && heightValue.trim() && hasFeatures) {
        const addParrot = {
            id: Math.floor(Math.random() * 100),
            title: titleValue,
            img: imgValue,
            price: priceValue,
            birthDate: BirthValue,
            sizes: {
                width: widthValue,
                height: heightValue
            },
            isFavorite: false,
            features: featuresOptions.toLocaleString(",")
        }

        // const pItem = renderParrots(addParrot);
        showParrot.push(addParrot);
        parrots.push(addParrot);

        refreshParrot()
        localStorageSet()

        HideModal.hide()
        addForm.reset()
        featuresOptions = []
    }

});

const editForm = editModal.querySelector("#edit-form");
const editTitle = editModal.querySelector("#edit-parrot-title");
const editImg = editModal.querySelector("#edit-parrot-img");
const editPrice = editModal.querySelector("#edit-price");
const editBirthDate = editModal.querySelector("#edit-parrot-date");
const editWidth = editModal.querySelector("#edit-parrot__width");
const editHeight = editModal.querySelector("#edit-parrot__height");
const editFeatures = editModal.querySelector("#edit-features");

featuresOptions = []
editFeatures.addEventListener("input", function () {
    const featuersValue = editFeatures.value;

    const splited = featuersValue.trim().split(",");

    if (splited.length == 2) {
        featuresOptions.push(splited[0]);
        editFeatures.value = "";
    }
});

parrotWraper.addEventListener("click", function (evt) {
    if (evt.target.matches(".delete-button")) {
        const clickedItemId = +evt.target.dataset.id

        const deleteIndex = parrots.findIndex(function (index) {
            return index.id == clickedItemId
        })

        showParrot.splice(deleteIndex, 1)
        parrots.splice(deleteIndex, 1);

        localStorageSet()

        refreshParrot()
    } else if (evt.target.matches(".edit-button")) {
        const clickedItemId = +evt.target.dataset.id


        const editIndex = parrots.findIndex(function (index) {
            return index.id === clickedItemId;
        });

        document.querySelector("#edit-form").setAttribute("data-edit-id", clickedItemId);

        const editFormElements = showParrot.find(function (index) {
            return clickedItemId === index.id
        });

        editTitle.value = editFormElements.title;
        editImg.value = editFormElements.img;
        editPrice.value = editFormElements.price;
        editBirthDate.value = editFormElements.birthDate;
        editWidth.value = editFormElements.sizes.width;
        editHeight.value = editFormElements.sizes.height;

    } else if (evt.target.matches(".favorite-button")) {
        const favoriteId = +evt.target.dataset.favoriteId;

        const favoriteIndex = parrots.findIndex(function (index) {
            return index.id === favoriteId;
        });

        const parrotCheck = parrots[favoriteIndex]
        if (parrots[favoriteIndex].isFavorite == false) {

            parrotCheck.isFavorite = true;


        //     if (favorites.length < 1) {
        //         favorites.push({
        //         id: favorites.length,
        //         title: parrotCheck.title,
        //     });
        //     } else if (favorites.length) {
                
        //     }

        //     // if (favorites.length == 0) {
        //     //     favorites.push({
        //     //     id: favorites.length,
        //     //     title: parrotCheck.title,
        //     // });
        //     // } else if (favorites.length == favorites) {
        //     //     favorites.push({
        //     //     id: favorites.length, 
        //     //     title: parrotCheck.title,
        //     // });
        //     // fCount = favorites.length
        //     // } else if (favorites.length > fCount) {
        //     //    favorites.push({
        //     //     id: favorites.length,
        //     //     title: parrotCheck.title,
        //     // });
        //     // }

        //     alert(`${parrotCheck.title} added to favorite`)
        //     console.log(favoriteIndex);

        // } else if (parrots[favoriteIndex].isFavorite == true) {

        //     parrotCheck.isFavorite = false;


        //     alert(`${parrotCheck.title} deleted in favorites`)
        //     if (favorites.length == 1) {
        //         favorites.splice(0, 1);

        //     } else if (favorites.length >= 1) {
        //         favorites.splice(favoriteIndex, 1);
        //         console.log(favorites[favoriteIndex.id]);
        //     }
        // }

        // refreshParrot()

        // localStorageSet()

    }
}
});

editForm.addEventListener("submit", function (evt) {
    evt.preventDefault()

    const editTitleValue = editTitle.value;
    const editImgValue = editImg.value
    const editPriceValue = editPrice.value;
    const editBirthDateValue = editBirthDate.value;
    const editWidthValue = editWidth.value;
    const editHeightValue = editHeight.value;

    const editHasFeatures = featuresOptions.length !== 0;

    if (editTitleValue.trim() && editImgValue.trim() && editPriceValue.trim() && editBirthDateValue.trim() && editWidthValue.trim() && editHeightValue.trim() && editHasFeatures) {
        const editFormId = +evt.target.dataset.editId;

        const editFormIndex = parrots.findIndex(function (editForm) {
            return editForm.id === editFormId;
        })

        const editParrot = {
            id: editFormId,
            title: editTitleValue,
            img: editImgValue,
            price: editPriceValue,
            birthDate: editBirthDateValue,
            sizes: {
                width: editWidthValue,
                height: editHeightValue
            },
            isFavorite: false,
            features: featuresOptions.toLocaleString(",")
        }

        showParrot.splice(editFormIndex, 1, editParrot);
        parrots.splice(editFormIndex, 1, editParrot);
        refreshParrot()

        localStorageSet();
        editForm.reset();

        editHideModal.hide();


    }
    featuresOptions = []
});

const filter = document.querySelector("#filter");;

filter.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const elements = evt.target.elements;
    const search = elements.search;
    const fromPrice = elements.from;
    const toPrice = elements.to;
    const fromWidth = elements.from_width;
    const toWidth = elements.to_width;
    const fromHeight = elements.from_height;
    const toHeight = elements.to_height;

    // values
    const searchValue = search.value;
    const fromPriceValue = fromPrice.value;
    const toPriceValue = toPrice.value;
    const fromWidthValue = fromWidth.value;
    const toWidthValue = toWidth.value;
    const fromHeightValue = fromHeight.value;
    const toHeightValue = toHeight.value;

    showParrot = parrots.filter(function (parot) {
        const searchRegExp = new RegExp(searchValue, "gi");

        const parrotPrice = Math.round(parot.price);
        const parrotWidth = Math.round(parot.sizes.width);
        const parrotHeight = Math.round(parot.sizes.height);


        const ifToPrice = !toPriceValue ? true : parrotPrice <= toPriceValue;
        const ifToWidth = !toWidthValue ? true : parrotWidth <= toWidthValue;
        const ifToHeight = !toHeightValue ? true : parrotHeight <= toHeightValue;

        return parrotPrice >= fromPriceValue && ifToPrice && parrotWidth >= fromWidthValue && ifToWidth && parrotHeight >= fromHeightValue && ifToHeight && parot.title.match(searchRegExp);
    })

    refreshParrot()
})
const parrotWraper = document.querySelector(".parrots-wrapper");

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


const renderParrots = function (parrotArray) {
    const {
        id,
        title,
        img,
        birthDate,
        sizes,
        isFavorite,
        features
    } = parrotArray

    const parrotsTemplate = document.querySelector("#parrots-template");
    const parrotItem = parrotsTemplate.content.cloneNode(true);

    parrotItem.querySelector(".edit-button").setAttribute("data-id", id);
    parrotItem.querySelector(".delete-button").setAttribute("data-id", id);

    document.querySelector("#edit-form").setAttribute("data-edit", id);
    parrotItem.querySelector(".card-title").textContent = title;
    parrotItem.querySelector(".parrot-img").src = img;
    parrotItem.querySelector(".parrot-w-h").textContent = price;
    parrotItem.querySelector(".parrot-w-h").textContent = `${sizes.width}sm x ${sizes.height}sm`;
    parrotItem.querySelector(".birth-date").textContent = birthDate;

    const featuresList = parrotItem.querySelector(".features-list");

    const featuresArray = features.split(",");

    featuresArray.forEach(function (fArray) {

        const featuresItem = addElement("li", "badge bg-primary me-1 mb-1", fArray);

        featuresList.append(featuresItem);
    });


    return parrotItem

}

const showParrot = parrots.slice()
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
    // localStorageSet()

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

        HideModal.hide()
        addForm.reset()
    }

});

const editForm = addModal.querySelector("#edit-form");
const editTitle = addModal.querySelector("#edit-parrot-title");
const editImg = addModal.querySelector("#edit-parrot-img");
const editPrice = addModal.querySelector("#edit-price");
const editBirthDate = addModal.querySelector("#edit-parrot-date");
const editWidth = addModal.querySelector("#edit-parrot__width");
const editHeight = addModal.querySelector("#edit-parrot__height");
const editFeatures = addModal.querySelector("#edit-features");

parrotWraper.addEventListener("click", function(evt){
    if (evt.target.matches(".delete-button")) {
        const clickedItemId = +evt.target.dataset.id

        const deleteIndex = parrots.findIndex(function(index){
            return index.id == clickedItemId
        })

        showParrot.splice(deleteIndex, 1)
        parrots.splice(deleteIndex, 1);

        refreshParrot()
    } else if (evt.target.matches(".edit-button")) {
        const clickedItemId = +evt.target.dataset.id

        const editIndex = parrots.findIndex(function(index){
            return index.id === clickedItemId;
        });

        const editFormIndex = +evt.target.dataset.edit;
        console.log(editFormIndex);
        const editFormElements = showParrot.find(function(index){
            return editFormIndex === index.id
        });

        console.log(editFormIndex);
        
    }
})
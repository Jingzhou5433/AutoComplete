const mockData = [
    "student on the bus","useless stuff","stubhub tickets","unusual","user study"," english teacher","long distant","search widget",
  "monkeyking","make american great again","working in progress","passion fruit","forget the past","led","global warming effect","former president",
  "keep going","soft landing","interest","darkness","mapkit","declared war","young generations","jump ahead",
  "shall","modern design","piece of cake","any circumstances","rough journey","breath subtlely","grade","bank association",
  "zero","go ahead","strong woman","biscuit basket","slabs","western logic thinking","keep fighting","xbox series x",
  "sell and buy","smaller than nothing","beside","vehicle garage","jack in the box"," good mood","stock dropped","energy man",
  "dog","pacific ocean","rubbed","trunk","glass","window","xfinity phone number","wake me up in the first day of september morning",
  "successful launching","including","look out","put together","US army","zillow estate","season flu","respect and love",
  "characteristic","writing a letter","grey goose","load","fought forever","summer last","feathers fade away","equal right"
  ];

  const input = document.querySelector("#input");
  const list = document.querySelector(".list");
  const reset = document.querySelector("#close");


function autoComplete(input, arr){
    var currentFocus;
    let offset = 0;
    input.addEventListener('input', function(e){
        let val = this.value;
        if(list.innerHTML !== '') closeAllLists();

        if(!val) return false;
        currentFocus = -1;

        arr.forEach((item, index) => {
            //create li
            if(item.includes(val)){
                list.style.display = "block";
                let listItem = document.createElement('li');
                // listItem.setAttribute('id',index);
                // listItem.setAttribute('class', 'auto-items');

                // bold the keywords:
                let start = item.indexOf(val);
                let s1 = item.slice(0,start);
                let s2 = item.slice(start+val.length);
                listItem.innerHTML = s1+`<strong style="font-weight: bold">${val}</strong>`+s2;

                // add eventLiistener to li
                // when click, fill the input value with li text
                listItem.addEventListener("click", () =>{
                    input.value = item;
                    closeAllLists();
                })

                list.appendChild(listItem);
                list.scroll(0,0);
            }
        });
    })

    //ketboard navigation
    input.addEventListener('keydown', (e)=>{
    
        let items = [...list.getElementsByTagName('li')];
        

        //esc
        if(e.keyCode == 27){
            input.value = '';
            list.style.display = "none";
            currentFocus = -1;
        }
        //down 
        if(e.keyCode == 40){
            removeActive(items);
            
            if(currentFocus == items.length-1){
                currentFocus = 0;
                offset = 0;
                list.scroll(0,offset);
            }else{
                currentFocus ++;
            }

            //handle scroll bar
            if(currentFocus!=0 && currentFocus % 4 == 0){
                offset += (35*4);               
                list.scroll(0,offset);
            }
            items[currentFocus].classList.add("active");
        }

        //up
        if(e.keyCode == 38){
            removeActive(items);
            if(currentFocus == 0){
                currentFocus = items.length -1;
                offset = ((items.length) * 35);
                list.scroll(0,offset);
            }else if(currentFocus == -1){
                //do nothing
            }else{
                currentFocus --;
            }
              
            offset -= (35);
            list.scroll(0,offset);
           

            if(currentFocus>=0) items[currentFocus].classList.add("active");
        }                   

        // enter
        if(e.keyCode == 13){
            e.preventDefault();
            if(currentFocus > -1){
                items[currentFocus].click();
            }
        }

    })



    function removeActive(listArr){
        if(!listArr) return false;
        listArr.forEach(listItem => {
            listItem.classList.remove("active");
        })
    }

    function closeAllLists(element){
        if(element == undefined || (element !== input && element !== list && element.tagName !== 'LI')){
            list.innerHTML = '';
            list.style.display = "none";
            // reset.style.opacity = "0";
        }
        currentFocus = -1;
        offset = 0;
    }

    //hide result when click other place
    document.addEventListener("click", (e) => {
        closeAllLists(e.target);
    })
    
}

autoComplete(input, mockData);
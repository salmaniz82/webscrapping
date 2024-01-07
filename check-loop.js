
// assuming the page has next button
let isPageDisabled = false;
let maxPagesToFetch = 5;

let pageCount = 1;

while(!isPageDisabled &&  maxPagesToFetch >= pageCount ) {


    console.log('fetching page', pageCount);
    if(pageCount == 3) isPageDisabled = true;
    pageCount++;

}


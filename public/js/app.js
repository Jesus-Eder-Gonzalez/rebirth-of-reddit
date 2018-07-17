'use strict'

/** Rebirth of reddit Initializer
 * 
 * Sets all my variables and event listeners for the page.
 * 
 */

let firstStaticSub;
let secondStaticSub;
let thirdStaticSub;
let randomSub;
let imageBoard = document.getElementById('pictureBoard');

function staticSubInitializer(subVariable, subId) {
  subVariable = document.getElementById(subId);
  subVariable.addEventListener('pointerenter', () => subVariable.style.color = 'white');
  subVariable.addEventListener('pointerleave', () => subVariable.style.color = 'dimgrey');
  subVariable.addEventListener('click', () => redditSubRequest.call(redditSubRequest, subVariable.dataset.url));
  console.log(subVariable);
}

staticSubInitializer(firstStaticSub, 'firstStaticSub');
staticSubInitializer(firstStaticSub, 'secondStaticSub');
staticSubInitializer(firstStaticSub, 'thirdStaticSub');



function redditSubRequest(url) {
  let redditGetRequest = new XMLHttpRequest()
  redditGetRequest.addEventListener('load', function () {
    let result = JSON.parse(this.response)['data']['children'];
    console.log(result[0]['data']);
    console.log(`The reddit title is ${result[0]['data']['title']}.`);
    console.log(`The reddit author is /u/${result[0]['data']['author']}.`);
    console.log(`The reddit post was made ${result[0]['data']['created_utc']} ago.`);
    console.log(`The reddit post has ${result[0]['data']['ups']} ups.`);
    console.log(`The reddit post has been clicked: ${result[0]['data']['clicked']}.`);
    console.log(`Preview: ${result[0]['data']['preview']}`);
    redditSubPopulator(result);
  });

  redditGetRequest.open('GET', url + '.json');
  redditGetRequest.send();
}

function redditSubPopulator(result) {
  console.log(result);
  let row = 0;
  let mod = 0;
  let currentRow = document.createElement('div');
  let firstPost;
  let secondPost;
  let picture;
  let title;
  let postInfo;
  let preview;

  if (imageBoard.firstChild) {
    while (imageBoard.firstChild) {
      imageBoard.removeChild(imageBoard.firstChild);
    }
  }

  for (let i = 0; i < result.length - 1; i++) {

    let titleText = result[i]['data']['title'];
    let author = result[i]['data']['author'];
    let dateTime = moment.unix(result[i]['data']['created_utc']).fromNow();
    let ups = result[i]['data']['ups'];
    let previewText = result[i]['data']['preview'];
    let link = result[i]['data']['permalink'];
    let images = result[i]['data']['preview'];
    let isVideo = result[i]['data']['is_video'];
    let pictureURL = result[i]['data']['thumbnail'];

    if (images && !isVideo) {
      pictureURL = result[i]['data']['preview']['images'][0]['source']['url'];
    }


    mod = i % 2;
    if (mod === 0) {
      currentRow.setAttribute('class', 'pictureRow');
      currentRow.dataset.row = row;
      firstPost = document.createElement('div');
      firstPost.setAttribute('class', 'picture');
      firstPost.dataset.row = row;
      firstPost.dataset.col = mod;
      // firstPost.innerText = i;

      picture = document.createElement('div');
      picture.style.backgroundImage = `url(${pictureURL})`;
      picture.setAttribute('class', 'img');
      firstPost.appendChild(picture);

      title = document.createElement('div');
      title.setAttribute('class', 'title');
      title.innerText = titleText;
      firstPost.appendChild(title);

      postInfo = document.createElement('div');
      postInfo.setAttribute('class', 'text');
      postInfo.innerHTML = `by ${author} &#8226 ${dateTime} &#8226 ${ups} upvotes`;
      firstPost.appendChild(postInfo);

      preview = document.createElement('div');
      preview.setAttribute('class', 'text');
      preview.innerText = previewText;
      firstPost.appendChild(preview);
      // console.log(result[0]['data']);
    } else {
      secondPost = document.createElement('div');
      secondPost.setAttribute('class', 'picture');
      secondPost.dataset.row = row;
      secondPost.dataset.col = mod;
      // secondPost.innerText = i;

      picture = document.createElement('div');
      picture.style.backgroundImage = 'url(/assets/logo.svg)';
      picture.setAttribute('class', 'img');
      secondPost.appendChild(picture);

      title = document.createElement('div');
      title.setAttribute('class', 'title');
      title.innerText = titleText;
      secondPost.appendChild(title);

      postInfo = document.createElement('div');
      postInfo.setAttribute('class', 'text');
      postInfo.innerHTML = `by ${author} &#8226 ${dateTime} &#8226 ${ups} upvotes`;
      secondPost.appendChild(postInfo);

      preview = document.createElement('div');
      preview.setAttribute('class', 'text');
      preview.innerText = previewText;
      secondPost.appendChild(preview);

      currentRow.appendChild(firstPost);
      currentRow.appendChild(secondPost);
      imageBoard.appendChild(currentRow);
      row++;
      currentRow = document.createElement('div');

    }

  }
  if (mod === 0) {
    currentRow.appendChild(firstPost);
    imageBoard.appendChild(currentRow);
  }

}

//  redditSubRequest('https://www.reddit.com/r/EmpireDidNothingWrong/new/.json', ()=>(console.log('Done.')));
// 277 * 168 px

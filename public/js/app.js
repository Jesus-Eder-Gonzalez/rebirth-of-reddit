'use strict'

/** Rebirth of reddit Initializer
 * 
 * Sets all my variables and event listeners for the page.
 * 
 */

let firstStaticSub;
let secondStaticSub;
let thirdStaticSub;
let randomSub = document.getElementById('randomSub');
let imageBoard = document.getElementById('pictureBoard');
const plus = document.getElementById('plus');
const instaLogo = document.getElementById('insta');
const randomSubArray = ['blackmagicfuckery/new',
  'AnimalsBeingJerks/new',
  'theydidthemath/new',
  'mantids/new',
  'gaming/new',
  'news/new',
  'Unexpected/new'];

let setRandom = function (randomButtonElement) {
  let random = Math.floor((Math.random()*7));
  redditSubRequest(randomButtonElement.dataset.url + randomSubArray[random]);
}

plus.addEventListener('pointerenter', () => {
  plus.style.color = 'white';
  plus.style.backgroundColor = 'orange';
});
plus.addEventListener('pointerleave', () => {
  plus.style.color = 'orange';
  plus.style.backgroundColor = 'white';
});
instaLogo.addEventListener('pointerenter', () => {
  instaLogo.src = '/assets/instagram_orange.svg';
});
instaLogo.addEventListener('pointerleave', () => {
  instaLogo.src = '/assets/instagram_grey.svg';
});

function staticSubInitializer(subVariable, subId) {
  subVariable = document.getElementById(subId);
  subVariable.addEventListener('pointerenter', () => subVariable.style.color = 'orange');
  subVariable.addEventListener('pointerleave', () => subVariable.style.color = 'dimgrey');
  if(subId === 'randomSub'){
    subVariable.addEventListener('click', () => {
      let random = Math.floor((Math.random()*7));
      redditSubRequest(subVariable.dataset.url + randomSubArray[random]);
    });
  }else{
    subVariable.addEventListener('click', () => {
      redditSubRequest(subVariable.dataset.url);
    });
  }

  console.log(subVariable);
}

setRandom(randomSub);

staticSubInitializer(randomSub, 'randomSub');
staticSubInitializer(firstStaticSub, 'firstStaticSub');
staticSubInitializer(secondStaticSub, 'secondStaticSub');
staticSubInitializer(thirdStaticSub, 'thirdStaticSub');

function redditSubRequest(url) {
  let redditGetRequest = new XMLHttpRequest()
  redditGetRequest.addEventListener('load', function () {
    let result = JSON.parse(this.response)['data']['children'];
    // console.log(result[0]['data']);
    // console.log(`The reddit title is ${result[0]['data']['title']}.`);
    // console.log(`The reddit author is /u/${result[0]['data']['author']}.`);
    // console.log(`The reddit post was made ${result[0]['data']['created_utc']} ago.`);
    // console.log(`The reddit post has ${result[0]['data']['ups']} ups.`);
    // console.log(`The reddit post has been clicked: ${result[0]['data']['clicked']}.`);
    // console.log(`Preview: ${result[0]['data']['preview']}`);
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
    let previewText = '';
    let link = result[i]['data']['permalink'];
    let isSelf = result[i]['data']['is_self'];

    // if (isSelf) {
    //   pictureURL = 'https://placebear.com/g/277/168';
    //   previewText = result[i]['data']['selftext'];
    // } else {
    //   let images = result[i]['data']['preview'];
    //   let isVideo = result[i]['data']['is_video'];
    //   // if(!isVideo && images){
    //   //   console.log(isVideo);
    //     // pictureURL = result[i].data.preview.images[0].resolutions[0].url;
    //     // result[i].data.preview.images[0].variants.mp4;

    //   if (images && !isVideo) {
    //     let hasGif = result[i].data.preview.images[0].variants.gif;
    //     let hasMP4 = result[i].data.preview.images[0].variants.mp4;
    //     let hasVideoPreview = result[i].data.preview.reddit_video_preview;
    //     // console.log((!(!hasGif)) && (!hasMP4) && (!hasVideoPreview));
    //     // console.log(!(!hasGif) + ' ' + (!hasMP4) + ' ' +(!hasVideoPreview));
    //     if ((!(!hasGif)) && (!hasMP4) && (!hasVideoPreview)) {
    //       let length = result[i]['data']['preview']['images'][0]['variants']['gif']['resolutions'].length;
    //       pictureURL = result[i]['data']['preview']['images'][0]['variants']['gif']['resolutions'][length - 1]['url'];
    //     } else if((!hasMP4) && (!hasVideoPreview)){
    //       pictureURL = result[i].data.preview.images[0].source.url;
    //     } else if((hasMP4 || hasVideoPreview) && !result[i].data.url.includes('gfycat')){
    //       pictureURL = result[i].data.url;
    //       // pictureURL = result[i].data.preview.images[0].variants.mp4.source.url;
    //     }
    //   }
    // }
    let pictureURL = result[i].data.thumbnail;
    if (isSelf) {
      pictureURL = 'https://placebear.com/g/277/168';
      previewText = result[i]['data']['selftext'];
    }
    // else {
    //   let images = result[i]['data']['preview'];
    //   let isVideo = result[i]['data']['is_video'];
    //   // if(!isVideo && images){
    //   //   console.log(isVideo);
    //     // pictureURL = result[i].data.preview.images[0].resolutions[0].url;
    //     // result[i].data.preview.images[0].variants.mp4;

    //   if (images && !isVideo) {
    //     let hasGif = result[i].data.preview.images[0].variants.gif;
    //     let hasMP4 = result[i].data.preview.images[0].variants.mp4;
    //     let hasVideoPreview = result[i].data.preview.reddit_video_preview;
    //     // console.log((!(!hasGif)) && (!hasMP4) && (!hasVideoPreview));
    //     // console.log(!(!hasGif) + ' ' + (!hasMP4) + ' ' +(!hasVideoPreview));
    //     if ((!(!hasGif)) && (!hasMP4) && (!hasVideoPreview)) {
    //       let length = result[i]['data']['preview']['images'][0]['variants']['gif']['resolutions'].length;
    //       pictureURL = result[i]['data']['preview']['images'][0]['variants']['gif']['resolutions'][length - 1]['url'];
    //     } else if((!hasMP4) && (!hasVideoPreview)){
    //       pictureURL = result[i].data.preview.images[0].source.url;
    //     } else if((hasMP4 || hasVideoPreview) && !result[i].data.url.includes('gfycat')){
    //       pictureURL = result[i].data.url;
    //       // pictureURL = result[i].data.preview.images[0].variants.mp4.source.url;
    //     }
    //   }
    // }

    console.log(i);

    // if (isSelf) {
    //   pictureURL = 'https://placebear.com/g/277/168';
    //   previewText = result[i]['data']['selftext'];
    // } else {
    //   let images = result[i]['data']['preview'];
    //   let isVideo = result[i]['data']['is_video'];
    //   // if(!isVideo && images){
    //   //   console.log(isVideo);
    //     // pictureURL = result[i].data.preview.images[0].resolutions[0].url;
    //     // result[i].data.preview.images[0].variants.mp4;

    //   if (images && !isVideo) {
    //     let hasGif = result[i].data.preview.images[0].variants.gif;
    //     let hasMP4 = result[i].data.preview.images[0].variants.mp4;
    //     let hasVideoPreview = result[i].data.preview.reddit_video_preview;
    //     // console.log((!(!hasGif)) && (!hasMP4) && (!hasVideoPreview));
    //     // console.log(!(!hasGif) + ' ' + (!hasMP4) + ' ' +(!hasVideoPreview));
    //     if ((!(!hasGif)) && (!hasMP4) && (!hasVideoPreview)) {
    //       let length = result[i]['data']['preview']['images'][0]['variants']['gif']['resolutions'].length;
    //       pictureURL = result[i]['data']['preview']['images'][0]['variants']['gif']['resolutions'][length - 1]['url'];
    //     } else if((!hasMP4) && (!hasVideoPreview)){
    //       pictureURL = result[i].data.preview.images[0].source.url;
    //     } else if((hasMP4 || hasVideoPreview) && !result[i].data.url.includes('gfycat')){
    //       pictureURL = result[i].data.url;
    //       // pictureURL = result[i].data.preview.images[0].variants.mp4.source.url;
    //     }
    //   }
    // }

    console.log(pictureURL);

    mod = i % 2;
    if (mod === 0) {
      currentRow.setAttribute('class', 'pictureRow');
      currentRow.dataset.row = row;
      firstPost = document.createElement('div');
      firstPost.setAttribute('class', 'picture');
      firstPost.dataset.row = row;
      firstPost.dataset.col = mod;

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
      preview.innerHTML = previewText;
      firstPost.appendChild(preview);

      firstPost.addEventListener('pointerenter', () => firstPost.style.color = 'orange');
      firstPost.addEventListener('pointerleave', () => firstPost.style.color = 'dimgrey');
      // console.log(result[0]['data']);
    } else {
      secondPost = document.createElement('div');
      secondPost.setAttribute('class', 'picture');
      secondPost.dataset.row = row;
      secondPost.dataset.col = mod;
      // secondPost.innerText = i;

      picture = document.createElement('div');
      picture.style.backgroundImage = `url(${pictureURL})`;
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
      preview.innerHTML = previewText;
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

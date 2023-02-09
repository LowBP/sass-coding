/* eslint-disable */

import { useEffect } from 'react';


export function updateQuality(products) {
  let dateDiffer;
  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  let getUserCookie = getCookie('user_login');
  if (getUserCookie) {
    getUserCookie = JSON.parse(Buffer.from(getUserCookie, 'base64').toString('ascii'));
  }

  if (!getUserCookie?.view) {
    let userCookie = {
      'view': new Date(),
    }
    let appendData = Buffer.from(JSON.stringify(userCookie)).toString('base64');
    setCookie('user_login', appendData, 365);
  }

  if (getUserCookie?.view) {
    let userView = new Date(getUserCookie?.view);
    userView.setHours(0);
    userView.setMinutes(0);
    userView.setMilliseconds(0);
    let todayDate = new Date();
    todayDate.setHours(0);
    todayDate.setMinutes(0);
    todayDate.setMilliseconds(0);
    dateDiffer = parseInt(((todayDate.getTime() - userView.getTime()) / (1000 * 60 * 60 * 24)).toFixed(0));
  }

  for (let i = 0; i < products.length; i++) {
    products[i].sellIn = parseInt(products[i].sellIn);
    products[i].quality = parseInt(products[i].quality);

    let qualityIncreaseTwice = false;

    if (products[i].type == "TICKETS" && products[i].sellIn >= 10 && (!getUserCookie?.view)) {
      products[i].quality = products[i].quality + 1;
      products[i].sellIn = products[i].sellIn - 1;
    } else {

      if (getUserCookie?.view) {
        if (products[i].isSecondHand) {
          products[i].quality = products[i].quality - (dateDiffer + 2);
        } else {
          products[i].quality = products[i].quality - dateDiffer;
          products[i].sellIn = products[i].sellIn - dateDiffer;
        }
      } else if (
        products[i].type == "TICKETS" &&
        products[i].sellIn < 10 &&
        products[i].sellIn > 1
      ) {
        products[i].quality = products[i].quality + 2;
        products[i].sellIn = products[i].sellIn - 1;
        qualityIncreaseTwice = true;
      } else {
        if (products[i].type == "TICKETS" && products[i].sellIn <= 1) {
          products[i].quality = 0;
          products[i].sellIn = 0;
        }

        if (
          products[i].type == "NORMAL" &&
          products[i].sellIn <= 0 &&
          products[i].quality > 0
        ) {
          products[i].quality = products[i].quality - 2;
          products[i].sellIn = products[i].sellIn - 1;
        }

        if (
          products[i].type == "NORMAL" &&
          products[i].sellIn > 0 &&
          products[i].quality == 0
        ) {
          products[i].quality = 0;
          products[i].sellIn = products[i].sellIn - 1;
        } else {
          if (
            products[i].type == "NORMAL" &&
            products[i].sellIn > 0 &&
            products[i].quality > 0
          ) {
            products[i].quality = products[i].quality - 1;
            products[i].sellIn = products[i].sellIn - 1;
          }
        }
      }
    }

    if (products[i].sellIn <= 0) {
      products[i].sellIn = 0;
      products[i].quality = products[i].quality - 2;
    }

    if (products[i].quality <= 0) {
      products[i].quality = 0;
    } else if (qualityIncreaseTwice && (products[i].sellIn < 10)) {
      products[i].quality = products[i].quality + 1;
    }
    
    if ((products[i].sellIn <= 0) && (products[i].quality <= 0)) {
      products[i].quality = products[i].quality + 1;
    }
  }

  return products;
}

export function Task2() {
  useEffect(() => {
    const products = [
      {
        name: 'concert a',
        type: 'TICKETS',
        quality: 30,
        sellIn: 12,
      },
      {
        name: 'concert b',
        type: 'TICKETS',
        quality: 30,
        sellIn: 8,
      },
      {
        name: 'concert c',
        type: 'TICKETS',
        quality: 30,
        sellIn: 1,
      },
      {
        name: 'macbook',
        type: 'NORMAL',
        quality: 30,
        sellIn: 0,
        isSecondHand: false,
      },
      {
        name: 'monitor',
        type: 'NORMAL',
        quality: 30,
        sellIn: 2,
        isSecondHand: false,
      },
      {
        name: 'keyboard',
        type: 'NORMAL',
        quality: 0,
        sellIn: 2,
        isSecondHand: false,
      },
      {
        name: 'mouse',
        type: 'NORMAL',
        quality: 20,
        sellIn: 5,
        isSecondHand: true,
      },
    ];

    const updated = updateQuality(products);
    console.log("Task-2 result=> ", updated);
  }, []);
  return null
}

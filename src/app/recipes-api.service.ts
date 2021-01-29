import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesApiService {
  apiKey = "8397f4d2eeb257f413c10cc2b892b043";
  appId = "de013f42";
  url = "https://api.edamam.com/search";
  recipes: any[] = [];
  favorites: any[] = [];
  searchTerm: string = "";
  constructor(private http: HttpClient) { }

  getRecipes() {
    const requestUrl =
      this.getUrlWithAPIKey() + ""; // add whatever params you want from here: https://developers.themoviedb.org/3/discover/movie-discover

    this.http.get(requestUrl).subscribe(
      (response: any) => {
        // console.log(response);
        this.recipes = response.hits;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  getRecipesFiltered(glutenFree: boolean, dairyFree: boolean, peanutFree: boolean,
    vegetarian: boolean, vegan: boolean, keto: boolean, kosher: boolean, hallal: boolean) {
    let requestUrl =
      this.getUrlWithAPIKey() + "&q=" + this.searchTerm;
    if (glutenFree) {
      requestUrl += "&health=gluten-free"
    }
    if (dairyFree) {
      requestUrl += "&health=dairy-free"
    }
    if (peanutFree) {
      requestUrl += "&health=peanut-free"
    }
    if (vegetarian) {
      requestUrl += "&health=vegetarian"
    }
    if (vegan) {
      requestUrl += "&health=vegan"
    } if (keto) {
      requestUrl += "&health=keto"
    }
    if (kosher) {
      requestUrl += "&health=kosher"
    }
    if (hallal) {
      requestUrl += "&health=hallal"
    }
    
    this.http.get(requestUrl).subscribe(
      (response: any) => {
        // console.log(response);
        this.recipes = response.hits;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getRecipesBySearchTerm(searchTerm: string) {
    const requestUrl =
      this.getUrlWithAPIKey() + "&q=" + searchTerm;
    this.searchTerm = searchTerm

    this.http.get(requestUrl).subscribe(
      (response: any) => {
        // console.log(response);
        this.recipes = response.hits;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getUrlWithAPIKey() {
    return `${this.url}?app_id=${this.appId}&app_key=${this.apiKey}`;
  }
}

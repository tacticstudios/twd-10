<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('logout', 'Auth\LoginController@logout');

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::patch('settings/profile', 'Settings\UpdateProfile');
    Route::patch('settings/password', 'Settings\UpdatePassword');

    Route::resource('categories', 'CategoryController');
    Route::post('categories/deleteSelected', 'CategoryController@deleteSelected');

    Route::resource('products', 'ProductController');
    Route::post('products/deleteSelected', 'ProductController@deleteSelected');

    Route::post('files/upload', 'FileController@upload');
});

Route::group(['middleware' => 'guest:api'], function () {
    Route::post('login', 'Auth\LoginController@login');
    Route::post('register', 'Auth\RegisterController@register');
    Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
    Route::post('password/reset', 'Auth\ResetPasswordController@reset');
    
});

Route::get('guest/data', 'GuestController@data');
Route::get('guest/products', 'GuestController@products');
Route::post('guest/sendQuotationRequest', 'GuestController@sendQuotationRequest');
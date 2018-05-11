<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Category;
use App\Product;

class GuestController extends Controller
{
    public function menu()
    {
        return Category::orderBy('name', 'asc')->get();
    }

    public function products(Request $request)
    {   
        $categoryId = $request->categoryId;
        return Product::where('category_id', $categoryId)->orderBy('name', 'asc')->get();
    }
}

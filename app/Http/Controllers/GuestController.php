<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Category;

class GuestController extends Controller
{
    public function menu()
    {
        return Category::orderBy('name', 'asc')->get();
    }
}

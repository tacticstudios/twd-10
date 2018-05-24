<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Category;
use App\Product;
use App\Mail\QuotationRequest;

class GuestController extends Controller
{
    public function menu()
    {
        return Category::orderBy('name', 'asc')->get();
    }

    public function products(Request $request)
    {   
        if(isset($request->id)) {
            return Product::find($request->id);
        }

        $categoryId = $request->categoryId;

        return Product::where('category_id', $categoryId)->orderBy('name', 'asc')->get();
    }

    public function sendQuotationRequest(Request $request)
    {   

        if (is_array($request->quotation_list) && sizeof($request->quotation_list) > 0) {
            $adminEmail = "gecedeveloper@gmail.com";

            $order = new \stdClass;
            $order->clientName = $request->name;
            $order->clientEmail = $request->email;
            $order->products = $request->quotation_list;

            \Mail::to($adminEmail)
                ->send(new QuotationRequest($order));
        }
        
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Category;
use App\Product;
use App\Mail\QuotationRequest;

class GuestController extends Controller
{
    public function data()
    {   
        $categories = Category::orderBy('name', 'asc')->get();
        foreach($categories as $key => $category) {
            $products = Product::where('category_id', $category->id)->orderBy('name', 'asc')->get();
            $categories[$key]->products = $products;
        }
        return $categories;
    }

    public function products(Request $request)
    {   
        if(isset($request->id)) {
            return Product::find($request->id);
        }

        $categoryId = $request->categoryId;

        return ;
    }

    public function sendQuotationRequest(Request $request)
    {   
        if (is_array($request->quotation_list) && sizeof($request->quotation_list) > 0) {
            $adminEmail = "gecedeveloper@gmail.com";

            $order = new \stdClass;
            $order->clientName = $request->name;
            $order->clientEmail = $request->email;
            $order->clientMessage = $request->message;
            $order->products = $request->quotation_list;

            \Mail::to($adminEmail)
                ->send(new QuotationRequest($order));
        }
    }
}

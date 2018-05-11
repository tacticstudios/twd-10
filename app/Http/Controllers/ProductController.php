<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $products = Product::orderBy('id', 'desc')->get();

        foreach($products as &$product) {
            $product->category = $product->category;
        }
        return $products;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $name = $request->name;
        $description = $request->description;
        $amount = $request->amount;
        $category_id = $request->category_id;
        $photo = $request->photo;

        $product = new Product();
        $product->name = $name;
        $product->description = $description;
        $product->amount = $amount;
        $product->category_id = $category_id;

        if($product->save()) {

            if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $fileName = time() . '.' . $image->getClientOriginalExtension();
    
                $img = \Image::make($image->getRealPath());
                $img->resize(120, 120, function ($constraint) {
                    $constraint->aspectRatio();                 
                });
    
                $img->stream(); // <-- Key point
    
                //dd();
                $full_url = 'images/1/smalls'.'/'.$fileName;
                \Storage::disk('public')->put($full_url, $img);

                $product_db->photos = $full_url;
                $product_db->save();
            }

            $product->category = $product->category;
            return $product;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
        $name = $request->name;
        $description = $request->description;
        $amount = $request->amount;
        $category_id = $request->category_id;
        $photo = $request->photo;

        $product = new Product();
        $product->name = $name;
        $product->description = $description;
        $product->amount = $amount;
        $product->category_id = $category_id;


        $product_db = Product::find($id);
        $product_db->name = $product->name;
        $product_db->description = $product->description;
        $product_db->amount = $product->amount;
        $product_db->category_id = $product->category_id;

        if($product_db->save()) {
            $product_db->category = $product_db->category;

            if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $fileName = time() . '.' . $image->getClientOriginalExtension();
    
                $img = \Image::make($image->getRealPath());
                $img->resize(120, 120, function ($constraint) {
                    $constraint->aspectRatio();                 
                });
    
                $img->stream(); // <-- Key point
    
                //dd();
                $full_url = 'images/1/smalls'.'/'.$fileName;
                \Storage::disk('public')->put($full_url, $img);

                $product_db->photos = $full_url;
                $product_db->save();
            }

            return $product_db;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {   
        $product = Product::find($id);
        $product->delete();
    }

    public function deleteSelected(Request $request)
    {   
        $products = $request->input('products');
        foreach ($products as $key => $value) {
            $product = Product::find($value);
            $product->delete();
        }
    }
    
}

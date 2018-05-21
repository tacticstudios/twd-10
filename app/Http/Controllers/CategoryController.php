<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories =  Category::orderBy('id', 'desc')->get();

        foreach ($categories as $key => &$category) {
            if($category->parent_id != 0 || $category->parent_id != null) {
                $parent = Category::find($category->parent_id);
                $category->parent = $parent;
            }
        }

        return $categories;

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $category = new Category();
        $category->name = $request->name;
        $category->description = $request->description;
        $category->parent_id = $request->parent_id;
        $category->photos = $request->photos;

        if($category->save()) {
            if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $fileName = time() . '.' . $image->getClientOriginalExtension();
    
                $img = \Image::make($image->getRealPath());
                $img->resize(300, 200, function ($constraint) {
                    $constraint->aspectRatio();                 
                });
    
                $img->stream(); // <-- Key point
    
                //dd();
                $full_url = 'images/1/smalls'.'/'.$fileName;
                \Storage::disk('public')->put($full_url, $img);

                $category->photos = $full_url;
                $category->save();
            }
            
            // Asignar category padre
            if($category->parent_id != 0 || $category->parent_id != null) {
                $parent = Category::find($category->parent_id);
                $category->parent = $parent;
            }

            return $category;
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
        $category_db = Category::find($id);
        $category_db->name = $request->name;
        $category_db->description = $request->description;
        $category_db->parent_id = $request->parent_id;

        if($category_db->save()) {
            if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $fileName = time() . '.' . $image->getClientOriginalExtension();
    
                $img = \Image::make($image->getRealPath());
                $img->resize(300, 200, function ($constraint) {
                    $constraint->aspectRatio();                 
                });
    
                $img->stream(); // <-- Key point
    
                //dd();
                $full_url = 'images/1/smalls'.'/'.$fileName;
                \Storage::disk('public')->put($full_url, $img);

                $category_db->photos = $full_url;
                $category_db->save();
            }

            // Asignar category padre
            if($category_db->parent_id != 0 || $category_db->parent_id != null) {
                $parent = Category::find($category_db->parent_id);
                $category_db->parent = $parent;
            }

            return $category_db;
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
        $category = Category::find($id);
        $category->delete();
    }

    public function deleteSelected(Request $request)
    {   
        $categories = $request->input('categories');
        foreach ($categories as $key => $value) {
            $category = Category::find($value);
            $category->delete();
        }
    }
    
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{

    public function upload(Request $request)
    {
        if ($request->hasFile('photo')) {
            $image = $request->file('photo');
            $fileName = time() . '.' . $image->getClientOriginalExtension();

            $img = \Image::make($image->getRealPath());
            $img->resize(120, 120, function ($constraint) {
                $constraint->aspectRatio();                 
            });

            $img->stream(); // <-- Key point

            //dd();
            \Storage::disk('local')->put('images/1/smalls'.'/'.$fileName, $img, 'public');
        }
    }

}

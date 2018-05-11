<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 100);
            $table->string('short_name', 50)->nullable();
            $table->text('description')->nullable();
            $table->decimal('amount',8,2)->unsigned()->nullable();
            $table->integer('category_id')->unsigned()->nullable();;
            $table->text('photos')->nullable();;
            $table->timestamps();
            $table->unsignedTinyInteger('is_active')->default(1);
            $table->softDeletes();
            $table->foreign('category_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}

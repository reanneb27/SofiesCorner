<?php 
//require 'classes/User.php';

// if (!isset($_POST['upload'])){

// $img_id = htmlentities($_POST['img_id']);
// $text = htmlentities($_POST['text']);
// $img=$_FILES['image']['name'];

// $user = new user();
// if ($user->addProduct($img_id, $img, $text)){
//   header('Location: ../views/addProduct.php?Add=success');
// }else{
// }
//   header('Location: ../views/addProduct.php?Add=failed');
// };

require_once '../classes/db.php';

if (!isset($_POST['submit'])){
};
$productname = htmlentities($_POST['productname']);
$description = htmlentities($_POST['p_desc']);
$img=$_FILES["image"]["name"];
//$tempname = $_FILES['image']["tmp_name"];
//$folder = "../../assets/plants/".$filename;
$category = $_POST['Plant_Categories'];
$price = htmlentities($_POST['price']);

$query = "INSERT into product(product_name, p_desc, image, category_id, price, created_at) VALUES ('$productname', '$description', '$img', '$category', '$price', Now())";
$result = mysqli_query($con, $query);
if($result){
    header('location: ../pages/admin/create_product.php');
}else{
}
?>

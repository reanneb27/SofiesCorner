<?php 
//Native can be converted to node
require_once '../classes/db.php';

if (!isset($_POST['submit'])){
};
$categoryname = htmlentities($_POST['category_name']);

$query = "INSERT into product_category(name, created_at) VALUES ('$categoryname', Now())";
$result = mysqli_query($con, $query);
if($result){
    header('location: ../pages/admin/create_category.html');
}else{
}
?>
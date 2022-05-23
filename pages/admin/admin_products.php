<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Sofie's Corner | Products</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"
      integrity="sha256-BtbhCIbtfeVWGsqxk1vOHEYXS6qcvQvLMZqjtpWUEx8="
      crossorigin="anonymous"
    />
    <link rel="shortcut icon" href="../../assets/logo/sofies_corner_logo_light.png">
    <link rel="stylesheet" href="../../css/mystyles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  </head>
  <body class="has-navbar-fixed-top">
    <nav class="navbar has-shadow is-fixed-top has-background-primary">
      <div class="navbar-brand">
        <!-- <a
          role="button"
          class="navbar-burger toggler"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> -->

        <a href="admin_dashboard.php" class="navbar-item has-text-weight-bold has-text-white px-5">
          SOFIE'S CORNER
        </a>
        <!-- <a
          role="button"
          class="navbar-burger nav-toggler"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> -->
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a href="#" class="navbar-item has-text-white p-1">
            <i class="fa-solid fa-bell"></i>
          </a>
          <div class="navbar-item dropdown is-hoverable">
            <a href="#" class="has-text-white p-1">
              <span>Admin Name</span>
              <span class="icon">
                <i class="fa-solid fa-caret-down" aria-hidden="true"></i>
            </span>
            </a>
            <div class="navbar-dropdown is-right">
              <a href="#" class="navbar-item">
                Profile
              </a>
              <a href="#" class="navbar-item">Settings</a>
              <hr class="navbar-divider" />
              <a href="#" class="navbar-item">Log Out</a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="columns is-variable is-0">
      <div class="column is-2 is-hidden-mobile">
        <div class="menu-container px-2">
          <div class="menu-wrapper py-3">
            <div class="menu">
              <ul class="menu-list">
                <li>
                  <a href="admin_dashboard.php" class="has-text-black">
                    <i class="fa-solid fa-gauge p-1"></i>
                    Dashboard</a>
                </li>
                <li>
                  <a href="admin_products.php" class="is-active has-background-primary">
                    <i class="fa-solid fa-bag-shopping p-1"></i>
                    Products</a>
                </li>
                <li>
                  <a href="admin_categories.php" class="has-text-black">
                    <i class="fa-solid fa-leaf p-1"></i>
                    Categories</a>
                </li>
                <li>
                  <a href="admin_clients.php" class="has-text-black">
                    <i class="fa-solid fa-users p-1"></i>
                    Clients</a>
                </li>
                <li>
                  <a href="admin_transactions.php" class="has-text-black">
                    <i class="fa-solid fa-coins p-1"></i>
                    Transactions</a>
                </li>
                <li>
                  <a href="admin_team.php" class="has-text-black">
                    <i class="fa-solid fa-user-gear p-1"></i>
                    Manage Team</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="p-1 pt-3 mx-2">
          <div class="columns is-variable is-desktop">
            <div class="column">
              <h1 class="title has-text-primary">
                Products
              </h1>
            </div>
            <div class="column is-2" align="right">
              <a href="create_product.php">
                <button class="button is-block is-link is-fullwidth" >
                  <span class="icon">
                    <i class="fa-solid fa-circle-plus"></i>                  
                  </span>
                  <span>Create New</span>
                </button>
              </a>
            </div>
          </div>
          
          <div class="level">
            <div class="level-left">
            <form method="GET" id='report_filter1' action="<?= $_SERVER['PHP_SELF'];?>">
              <div class="level-item">
                <div class="field has-addons">
                  <div class="control">
                  <input class="input is-link" size="50" type="text" name="search" id="search" placeholder="Search" onchange="document.getElementById('report_filter1').submit();">
                  </div>
                  <div class="control">
                    <a class="button is-link">
                      <i class="fas fa-search"></i>
                    </a>
                  </div>
                </div>
            </form>  
              </div>
            </div>

            <div class="level-right">
              <div class="level-item">
              <form method="GET" id='report_filter2' action="<?= $_SERVER['PHP_SELF'];?>">
                <div class="control has-icons-left">
                  <div class="select is-link">
                    <select name="Plant_Categories" onchange="document.getElementById('report_filter2').submit();">
                      <option selected>Category</option>
                      <option value="1">Succulent w/ Pots</option>
                      <option value="2">Succulent w/o Pots</option>
                      <option value="3">Moon Cactus</option>
                      <option value="4">Air Plants</option>
                      <option value="5">Hanging Plants</option>
                      <option value="6">Pots</option>
                    </select>
                    <!-- <select name="Plant Categories">
                      <option selected>Category</option>
                      <option value="Succulent w/ Pots">Succulent w/ Pots</option>
                      <option value="Succulent w/o Pots">Succulent w/o Pots</option>
                      <option value="Moon Cactus">Moon Cactus</option>
                      <option value="Air Plants">Air Plants</option>
                      <option value="Hanging Plants">Hanging Plants</option>
                      <option value="Pots">Pots</option>
                    </select> -->
                  </div>
                  <span class="icon is-left">
                    <i class="fa-solid fa-filter"></i>
                  </span>
              </form>  
                </div>
              </div>

              <div class="level-item">
                <div class="control has-icons-left">
                  <form method="GET" id='report_filter' action="<?= $_SERVER['PHP_SELF'];?>">
                    <div class="select is-link">
                      <select name='sort' onchange="document.getElementById('report_filter').submit();">
                        <option selected>Sort</option>
                        <option value='NUMASC'>Price, low to high</option>
                        <option value='NUMDESC'>Price, high to low</option>
                        <option value='ASC'>Alphabetically, A-Z</option>
                        <option value='DESC'>Alphabetically, Z-A</option>
                        <option value='TIMEASC'>Date, new to old</option>
                        <option value='TIMEDESC'>Date, old to new</option>
                      </select>
                    </div>
                    <span class="icon is-left">
                      <i class="fa-solid fa-sort"></i>
                    </span>
                  </form>  
                </div>
              </div>
            </div>
          </div>
            <?php 
              require_once '../../classes/db.php';
            ?>
          <!-- <div class="columns mt-5 mx-2 is-10 is-variable">
            <div class="column is-2">
              <div class="card">
                  <div class="card-image has-text-centered pt-4 px-2">
                      <img src="https://unsplash.it/g/300/300" alt="">
                  </div>
                  <div class="card-content">
                      <p class="price">&#8369;0.00</p>
                      <p class="title is-size-5 has-text-primary">Plant Name</p>
                  </div>
                  
                      <footer class="card-footer">
                          <p class="card-footer-item has-background-primary">
                            <a href="" class="has-text-white">
                              <span class="icon">
                                <i class="fa-regular fa-pen-to-square"></i>
                              </span>
                              </a>
                          </p>
                          <p class="card-footer-item has-background-danger">
                            <a href="" class="has-text-white">
                              <span class="icon">
                                <i class="fa-solid fa-trash"></i>
                              </span>
                              </a>
                          </p>
                      </footer>
                  </a>
              </div>
            </div>
            <div class="column is-2">
              <div class="card">
                  <div class="card-image has-text-centered pt-4 px-2">
                      <img src="https://unsplash.it/g/300/300" alt="">
                  </div>
                  <div class="card-content">
                      <p class="price">&#8369;0.00</p>
                      <p class="title is-size-5 has-text-primary">Plant Name</p>
                  </div>
                  
                      <footer class="card-footer">
                          <p class="card-footer-item has-background-primary">
                            <a href="" class="has-text-white">
                              <span class="icon">
                                <i class="fa-regular fa-pen-to-square"></i>
                              </span>
                              </a>
                          </p>
                          <p class="card-footer-item has-background-danger">
                            <a href="" class="has-text-white">
                              <span class="icon">
                                <i class="fa-solid fa-trash"></i>
                              </span>
                              </a>
                          </p>
                      </footer>
                  </a>
              </div>
            </div>
            <div class="column is-2">
              <div class="card">
                  <div class="card-image has-text-centered pt-4 px-2">
                      <img src="https://unsplash.it/g/300/300" alt="">
                  </div>
                  <div class="card-content">
                      <p class="price">&#8369;0.00</p>
                      <p class="title is-size-5 has-text-primary">Plant Name</p>
                  </div>
                  
                      <footer class="card-footer">
                          <p class="card-footer-item has-background-primary">
                            <a href="" class="has-text-white">
                              <span class="icon">
                                <i class="fa-regular fa-pen-to-square"></i>
                              </span>
                              </a>
                          </p>
                          <p class="card-footer-item has-background-danger">
                            <a href="" class="has-text-white">
                              <span class="icon">
                                <i class="fa-solid fa-trash"></i>
                              </span>
                              </a>
                          </p>
                      </footer>
                  </a>
              </div>
            </div>

          </div> -->
          <div class='columns mt-5 mx-2 is-10 is-variable'>
                  <?php 
                if (isset($_GET['pageno'])) {
                    $pageno = $_GET['pageno'];
                } else {
                    $pageno = 1;
                }
                $no_of_records_per_page = 6;
                $offset = ($pageno-1) * $no_of_records_per_page;

                $total_pages_sql = "SELECT COUNT(*) FROM product";
                $result = mysqli_query($con,$total_pages_sql);
                $total_rows = mysqli_fetch_array($result)[0];
                $total_pages = ceil($total_rows / $no_of_records_per_page);

                $sort = $_GET['sort'];
                //$search = $_GET['search'];

                if($sort == 'ASC'){
                  $sql = "SELECT a.product_name,a.price, a.image, b.name, b.cat_desc FROM product a INNER JOIN product_category b on b.product_category_id=a.category_id order by product_name ASC limit $offset, $no_of_records_per_page";
                  $res_data = mysqli_query($con,$sql);
                    if($res_data->num_rows > 0 ){
                    while($row = mysqli_fetch_array($res_data)){
                      echo"<div class='column is-2'>";
                      echo"<div class='card'>";
                      echo"<div class='card-image has-text-centered pt-4 px-2'>";
                        echo"<img src='../../assets/plants/".$row['cat_desc']."/".$row['image']."' alt='' style='width:300px; height:300px;'>";
                      echo"</div>";
                          echo"<div class='card-content'>";
                          echo"<p class='price'>&#8369;".$row['price']."</p>";
                          echo"<p class='title is-size-5 has-text-primary'>".$row['product_name']."</p>";
                          echo"</div>";
                      echo"<footer class='card-footer'>";
                        echo"<p class='card-footer-item has-background-primary'>";
                          echo"<a href='' class='has-text-white'>";
                          echo"<span class='icon'>";
                            echo"<i class='fa-regular fa-pen-to-square'></i>";
                          echo"</span>";
                            echo"<span>Edit</span>";
                          echo"</a>";
                        echo"</p>";
                        echo"<p class='card-footer-item has-background-danger'>";
                          echo"<a href='' class='has-text-white'>";
                            echo"<span class='icon'>";
                              echo"<i class='fa-solid fa-trash'></i>";
                            echo"</span>";
                              echo"<span>Delete</span>";
                          echo"</a>";
                        echo"</p>";
                      echo"</footer>";
                      echo "</div>";
                  echo "</div>";
                    }
                  }
                }
                else if($sort == 'DESC'){
                  $sql = "SELECT a.product_name,a.price, a.image, b.name, b.cat_desc FROM product a INNER JOIN product_category b on b.product_category_id=a.category_id order by product_name DESC limit $offset, $no_of_records_per_page";
                  $res_data = mysqli_query($con,$sql);
                    if($res_data->num_rows > 0 ){
                    while($row = mysqli_fetch_array($res_data)){
                      echo"<div class='column is-2'>";
                      echo"<div class='card'>";
                      echo"<div class='card-image has-text-centered pt-4 px-2'>";
                        echo"<img src='../../assets/plants/".$row['cat_desc']."/".$row['image']."' alt='' style='width:300px; height:300px;'>";
                      echo"</div>";
                          echo"<div class='card-content'>";
                          echo"<p class='price'>&#8369;".$row['price']."</p>";
                          echo"<p class='title is-size-5 has-text-primary'>".$row['product_name']."</p>";
                          echo"</div>";
                      echo"<footer class='card-footer'>";
                        echo"<p class='card-footer-item has-background-primary'>";
                          echo"<a href='' class='has-text-white'>";
                          echo"<span class='icon'>";
                            echo"<i class='fa-regular fa-pen-to-square'></i>";
                          echo"</span>";
                            echo"<span>Edit</span>";
                          echo"</a>";
                        echo"</p>";
                        echo"<p class='card-footer-item has-background-danger'>";
                          echo"<a href='' class='has-text-white'>";
                            echo"<span class='icon'>";
                              echo"<i class='fa-solid fa-trash'></i>";
                            echo"</span>";
                              echo"<span>Delete</span>";
                          echo"</a>";
                        echo"</p>";
                      echo"</footer>";
                      echo "</div>";
                  echo "</div>";
                    }
                  }

                }
                else if($sort == 'NUMASC'){
                  $sort3 = 'ASC';
                  $sql = "SELECT a.product_name,a.price, a.image, b.name, b.cat_desc FROM product a INNER JOIN product_category b on b.product_category_id=a.category_id order by price ASC limit $offset, $no_of_records_per_page";
                  $res_data = mysqli_query($con,$sql);
                if($res_data->num_rows > 0 ){
                while($row = mysqli_fetch_array($res_data)){
                  echo"<div class='column is-2'>";
                  echo"<div class='card'>";
                   echo"<div class='card-image has-text-centered pt-4 px-2'>";
                     echo"<img src='../../assets/plants/".$row['cat_desc']."/".$row['image']."' alt='' style='width:300px; height:300px;'>";
                   echo"</div>";
                      echo"<div class='card-content'>";
                       echo"<p class='price'>&#8369;".$row['price']."</p>";
                       echo"<p class='title is-size-5 has-text-primary'>".$row['product_name']."</p>";
                      echo"</div>";
                   echo"<footer class='card-footer'>";
                     echo"<p class='card-footer-item has-background-primary'>";
                       echo"<a href='' class='has-text-white'>";
                       echo"<span class='icon'>";
                         echo"<i class='fa-regular fa-pen-to-square'></i>";
                       echo"</span>";
                         echo"<span>Edit</span>";
                       echo"</a>";
                     echo"</p>";
                     echo"<p class='card-footer-item has-background-danger'>";
                       echo"<a href='' class='has-text-white'>";
                         echo"<span class='icon'>";
                           echo"<i class='fa-solid fa-trash'></i>";
                         echo"</span>";
                           echo"<span>Delete</span>";
                       echo"</a>";
                     echo"</p>";
                   echo"</footer>";
                  echo "</div>";
               echo "</div>";
                }
              }
                }
                else if($sort == 'NUMDESC'){
                  $sort4 = 'DESC';
                  $sql = "SELECT a.product_name,a.price, a.image, b.name, b.cat_desc FROM product a INNER JOIN product_category b on b.product_category_id=a.category_id order by price $sort4 limit $offset, $no_of_records_per_page";
                  $res_data = mysqli_query($con,$sql);
                if($res_data->num_rows > 0 ){
                while($row = mysqli_fetch_array($res_data)){
                  echo"<div class='column is-2'>";
                  echo"<div class='card'>";
                   echo"<div class='card-image has-text-centered pt-4 px-2'>";
                     echo"<img src='../../assets/plants/".$row['cat_desc']."/".$row['image']."' alt='' style='width:300px; height:300px;'>";
                   echo"</div>";
                      echo"<div class='card-content'>";
                       echo"<p class='price'>&#8369;".$row['price']."</p>";
                       echo"<p class='title is-size-5 has-text-primary'>".$row['product_name']."</p>";
                      echo"</div>";
                   echo"<footer class='card-footer'>";
                     echo"<p class='card-footer-item has-background-primary'>";
                       echo"<a href='' class='has-text-white'>";
                       echo"<span class='icon'>";
                         echo"<i class='fa-regular fa-pen-to-square'></i>";
                       echo"</span>";
                         echo"<span>Edit</span>";
                       echo"</a>";
                     echo"</p>";
                     echo"<p class='card-footer-item has-background-danger'>";
                       echo"<a href='' class='has-text-white'>";
                         echo"<span class='icon'>";
                           echo"<i class='fa-solid fa-trash'></i>";
                         echo"</span>";
                           echo"<span>Delete</span>";
                       echo"</a>";
                     echo"</p>";
                   echo"</footer>";
                  echo "</div>";
               echo "</div>";
                }
              }
              
                }else if($sort == 'TIMEASC'){
                  $sort5 = 'DESC';
                  $sql = "SELECT a.product_name,a.price, a.image,a.created_at, b.name, b.cat_desc FROM product a INNER JOIN product_category b on b.product_category_id=a.category_id order by created_at $sort5 limit $offset, $no_of_records_per_page";
                  $res_data = mysqli_query($con,$sql);
                if($res_data->num_rows > 0 ){
                while($row = mysqli_fetch_array($res_data)){
                  echo"<div class='column is-2'>";
                  echo"<div class='card'>";
                   echo"<div class='card-image has-text-centered pt-4 px-2'>";
                     echo"<img src='../../assets/plants/".$row['cat_desc']."/".$row['image']."' alt='' style='width:300px; height:300px;'>";
                   echo"</div>";
                      echo"<div class='card-content'>";
                       echo"<p class='price'>&#8369;".$row['price']."</p>";
                       echo"<p class='title is-size-5 has-text-primary'>".$row['product_name']."</p>";
                      echo"</div>";
                   echo"<footer class='card-footer'>";
                     echo"<p class='card-footer-item has-background-primary'>";
                       echo"<a href='' class='has-text-white'>";
                       echo"<span class='icon'>";
                         echo"<i class='fa-regular fa-pen-to-square'></i>";
                       echo"</span>";
                         echo"<span>Edit</span>";
                       echo"</a>";
                     echo"</p>";
                     echo"<p class='card-footer-item has-background-danger'>";
                       echo"<a href='' class='has-text-white'>";
                         echo"<span class='icon'>";
                           echo"<i class='fa-solid fa-trash'></i>";
                         echo"</span>";
                           echo"<span>Delete</span>";
                       echo"</a>";
                     echo"</p>";
                   echo"</footer>";
                  echo "</div>";
               echo "</div>";
                }
              }
              
                }
                else if($sort == 'TIMEDESC'){
                  $sort6 = 'DESC';
                  $sql = "SELECT a.product_name,a.price, a.image,a.created_at, b.name, b.cat_desc FROM product a INNER JOIN product_category b on b.product_category_id=a.category_id order by created_at $sort6 limit $offset, $no_of_records_per_page";
                  $res_data = mysqli_query($con,$sql);
                if($res_data->num_rows > 0 ){
                while($row = mysqli_fetch_array($res_data)){
                  echo"<div class='column is-2'>";
                  echo"<div class='card'>";
                   echo"<div class='card-image has-text-centered pt-4 px-2'>";
                     echo"<img src='../../assets/plants/".$row['cat_desc']."/".$row['image']."' alt='' style='width:300px; height:300px;'>";
                   echo"</div>";
                      echo"<div class='card-content'>";
                       echo"<p class='price'>&#8369;".$row['price']."</p>";
                       echo"<p class='title is-size-5 has-text-primary'>".$row['product_name']."</p>";
                      echo"</div>";
                   echo"<footer class='card-footer'>";
                     echo"<p class='card-footer-item has-background-primary'>";
                       echo"<a href='' class='has-text-white'>";
                       echo"<span class='icon'>";
                         echo"<i class='fa-regular fa-pen-to-square'></i>";
                       echo"</span>";
                         echo"<span>Edit</span>";
                       echo"</a>";
                     echo"</p>";
                     echo"<p class='card-footer-item has-background-danger'>";
                       echo"<a href='' class='has-text-white'>";
                         echo"<span class='icon'>";
                           echo"<i class='fa-solid fa-trash'></i>";
                         echo"</span>";
                           echo"<span>Delete</span>";
                       echo"</a>";
                     echo"</p>";
                   echo"</footer>";
                  echo "</div>";
               echo "</div>";
                }
              }
              
                }else if($search = $_GET['search']){
                  $search = $_GET['search'];
                  $sql = "SELECT a.product_name,a.price, a.image,a.created_at, b.name, b.cat_desc FROM product a INNER JOIN product_category b on b.product_category_id=a.category_id where a.product_name like '%$search%' limit $offset, $no_of_records_per_page";
                  $res_data = mysqli_query($con,$sql);
                if($res_data->num_rows > 0 ){
                while($row = mysqli_fetch_array($res_data)){
                  echo"<div class='column is-2'>";
                  echo"<div class='card'>";
                   echo"<div class='card-image has-text-centered pt-4 px-2'>";
                     echo"<img src='../../assets/plants/".$row['cat_desc']."/".$row['image']."' alt='' style='width:300px; height:300px;'>";
                   echo"</div>";
                      echo"<div class='card-content'>";
                       echo"<p class='price'>&#8369;".$row['price']."</p>";
                       echo"<p class='title is-size-5 has-text-primary'>".$row['product_name']."</p>";
                      echo"</div>";
                   echo"<footer class='card-footer'>";
                     echo"<p class='card-footer-item has-background-primary'>";
                       echo"<a href='' class='has-text-white'>";
                       echo"<span class='icon'>";
                         echo"<i class='fa-regular fa-pen-to-square'></i>";
                       echo"</span>";
                         echo"<span>Edit</span>";
                       echo"</a>";
                     echo"</p>";
                     echo"<p class='card-footer-item has-background-danger'>";
                       echo"<a href='' class='has-text-white'>";
                         echo"<span class='icon'>";
                           echo"<i class='fa-solid fa-trash'></i>";
                         echo"</span>";
                           echo"<span>Delete</span>";
                       echo"</a>";
                     echo"</p>";
                   echo"</footer>";
                  echo "</div>";
               echo "</div>";
                }
              }
              
                }else if($cat = $_GET['Plant_Categories']){
                  $cat = $_GET['Plant_Categories'];
                  $sql = "SELECT a.product_name,a.price, a.image,a.created_at, b.name, b.cat_desc, b.product_category_id FROM product a INNER JOIN product_category b on b.product_category_id=a.category_id WHERE b.product_category_id = '$cat' limit $offset, $no_of_records_per_page";
                  $res_data = mysqli_query($con,$sql);
                if($res_data->num_rows > 0 ){
                while($row = mysqli_fetch_array($res_data)){
                  echo"<div class='column is-2'>";
                  echo"<div class='card'>";
                   echo"<div class='card-image has-text-centered pt-4 px-2'>";
                     echo"<img src='../../assets/plants/".$row['cat_desc']."/".$row['image']."' alt='' style='width:300px; height:300px;'>";
                   echo"</div>";
                      echo"<div class='card-content'>";
                       echo"<p class='price'>&#8369;".$row['price']."</p>";
                       echo"<p class='title is-size-5 has-text-primary'>".$row['product_name']."</p>";
                      echo"</div>";
                   echo"<footer class='card-footer'>";
                     echo"<p class='card-footer-item has-background-primary'>";
                       echo"<a href='' class='has-text-white'>";
                       echo"<span class='icon'>";
                         echo"<i class='fa-regular fa-pen-to-square'></i>";
                       echo"</span>";
                         echo"<span>Edit</span>";
                       echo"</a>";
                     echo"</p>";
                     echo"<p class='card-footer-item has-background-danger'>";
                       echo"<a href='' class='has-text-white'>";
                         echo"<span class='icon'>";
                           echo"<i class='fa-solid fa-trash'></i>";
                         echo"</span>";
                           echo"<span>Delete</span>";
                       echo"</a>";
                     echo"</p>";
                   echo"</footer>";
                  echo "</div>";
               echo "</div>";
                }
              }
              
                }else{
                  $sql = "SELECT a.product_name,a.price, a.image, b.name, b.cat_desc FROM product a INNER JOIN product_category b on b.product_category_id=a.category_id limit $offset, $no_of_records_per_page";
                  $res_data = mysqli_query($con,$sql);
                if($res_data->num_rows > 0 ){
                while($row = mysqli_fetch_array($res_data)){
                  echo"<div class='column is-2'>";
                  echo"<div class='card'>";
                   echo"<div class='card-image has-text-centered pt-4 px-2'>";
                     echo"<img src='../../assets/plants/".$row['cat_desc']."/".$row['image']."' alt='' style='width:300px; height:300px;'>";
                   echo"</div>";
                      echo"<div class='card-content'>";
                       echo"<p class='price'>&#8369;".$row['price']."</p>";
                       echo"<p class='title is-size-5 has-text-primary'>".$row['product_name']."</p>";
                      echo"</div>";
                   echo"<footer class='card-footer'>";
                     echo"<p class='card-footer-item has-background-primary'>";
                       echo"<a href='' class='has-text-white'>";
                       echo"<span class='icon'>";
                         echo"<i class='fa-regular fa-pen-to-square'></i>";
                       echo"</span>";
                         echo"<span>Edit</span>";
                       echo"</a>";
                     echo"</p>";
                     echo"<p class='card-footer-item has-background-danger'>";
                       echo"<a href='' class='has-text-white'>";
                         echo"<span class='icon'>";
                           echo"<i class='fa-solid fa-trash'></i>";
                         echo"</span>";
                           echo"<span>Delete</span>";
                       echo"</a>";
                     echo"</p>";
                   echo"</footer>";
                  echo "</div>";
               echo "</div>";
                }
              }
                }                            
            ?>
       </div>      
            <nav class="pagination" role="navigation" aria-label="pagination">
            <a href="<?php if($pageno <= 1){ echo '#'; } else { echo "?pageno=".($pageno - 1); } ?>" class="pagination-previous button is-link" title="This is the first page">Prev</a>
            <a href="<?php if($pageno >= $total_pages){ echo '#'; } else { echo "?pageno=".($pageno + 1); } ?>" class="pagination-next button is-link">Next</a>
              <ul class="pagination-list">
                <li>
                  
                </li>
                <a href="?pageno=1" class="pagination-link is-current button" aria-label="Page 1" aria-current="page" placeholder="">First</a>
                <li class="<?php if($pageno <= 1){ echo 'disabled'; } ?>">
                    
                </li>
                <li class="<?php if($pageno >= $total_pages){ echo 'disabled'; } ?>">
                    
                </li>
                <li><a href="?pageno=<?php echo $total_pages; ?>" class="pagination-link button is-primary is-outlined" aria-label="Goto page last" placeholder="">Last</a></li>
             </ul>
            </nav>
          <!-- <nav class="pagination" role="navigation" aria-label="pagination">
            <a class="pagination-previous button is-link" title="This is the first page">Previous</a>
            <a class="pagination-next button is-link">Next page</a>
            <ul class="pagination-list">
              <li>
                <a class="pagination-link is-current button" aria-label="Page 1" aria-current="page">1</a>
              </li>
              <li>
                <a class="pagination-link button is-primary is-outlined" aria-label="Goto page 2">2</a>
              </li>
              <li>
                <a class="pagination-link button is-primary is-outlined" aria-label="Goto page 3">3</a>
              </li>
            </ul>
          </nav> -->
        </div> <!-- column container -->
      </div>
    </div>
  </body>
</html>

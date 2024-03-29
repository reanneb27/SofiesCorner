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
              <h1 class="title has-text-primary mb-2">
                Create Product
              </h1>

              <nav class="breadcrumb is-small" aria-label="breadcrumbs">
                <ul>
                  <li><a href="admin_dashboard.php">Dashboard</a></li>
                  <li><a href="admin_products.php">Products</a></li>
                  <li class="is-active"><a href="create_product.php" aria-current="page">Create Product</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div class="column">
        <form class="box" action="../../post/addProduct.php" method="POST" style="max-width: 500px;" enctype="multipart/form-data">
            <div class="column" style="max-width: 500px;">
              <div class="field">
                <label class="label">Product Name</label>
                <div class="control">
                  <input class="input is-primary" type="text" name="productname" placeholder="Enter Name">
                </div>
              </div>

              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <textarea class="textarea is-primary" name="p_desc" placeholder="Enter Description"></textarea>
                </div>
              </div>
              
              <div class="file has-name is-boxed is-primary">
                <label class="file-label">
                  <input type="file" class="file-input" name="image" id="image" accept="image/png, image/jpeg">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Choose a file…
                    </span>
                  </span>
                  <span class="file-name">
                    file_name
                  </span>
                </label>
              </div>
              
              <div class="field">
                <label class="label">Category</label>
                <div class="control">
                  <div class="select is-primary">
                    <select name="Plant_Categories">
                      <option selected>Category</option>
                      <option value="1">Succulent w/ Pots</option>
                      <option value="2">Succulent w/o Pots</option>
                      <option value="3">Moon Cactus</option>
                      <option value="4">Air Plants</option>
                      <option value="5">Hanging Plants</option>
                      <option value="6">Pots</option>
                      <!-- <option value="Succulent w/ Pots">Succulent w/ Pots</option>
                      <option value="Succulent w/o Pots">Succulent w/o Pots</option>
                      <option value="Moon Cactus">Moon Cactus</option>
                      <option value="Air Plants">Air Plants</option>
                      <option value="Hanging Plants">Hanging Plants</option>
                      <option value="Pots">Pots</option> -->
                    </select>
                  </div>
                </div>
              </div>
              
              <label class="label">Price</label>
              <div class="field has-addons">
                <div class="control">
                  <a class="button is-primary is-diabled">
                    &#8369;
                  </a>
                </div>
                <div class="control">
                  <input class="input is-primary" type="text" name="price" placeholder="0.00">
                </div>
              </div>  
              
              <div class="field is-grouped">
                <div class="control">
                  <button type="submit" name="submit" class="button is-link">Submit</button>
                </div>
               
                <div class="control">
                  <a href="admin_products.php">
                    <input name="cancel" id="cancel" class="button is-link is-outlined" onclick="window.location.href='admin_products.php'" placeholder="Cancel" style='width: 100px;'>
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>  
    </div> <!-- content container -->
    
  </body>
</html>

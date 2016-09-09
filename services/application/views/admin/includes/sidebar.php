<!-- sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <h3>Admin</h3>
                <ul class="nav side-menu">
                  <li><a href="<?php echo base_url();?>admin/dashboard"><i class="fa fa-home"></i> Dashboard</a>                    
                  </li>
                  <li><a href="<?php echo base_url();?>admin/users"><i class="fa fa-user"></i> Users</a>                    
                  </li>
                 
                  <li><a href="<?php echo base_url();?>admin/category"><i class="fa fa-bar-chart-o"></i> Category List</a>                    
                  </li> 
                  <li><a href="<?php echo base_url();?>admin/category/channel_list"><i class="fa fa-tasks"></i> Channel List</a>                    
                  </li> 
                </ul>
              </div>
              

            </div>
            <!-- /sidebar menu -->
            
             </div>
        </div>
        <!-- top navigation -->
        <div class="top_nav">
          <div class="nav_menu">
            <nav>
              <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
              </div>

              <ul class="nav navbar-nav navbar-right">
                <li class="">
                  <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img src="<?php echo base_url(); ?>assets/images/employee.png" alt=""><?php echo $this->session->userdata('fname').' '.$this->session->userdata('lname');?>
                    <span class=" fa fa-angle-down"></span>
                  </a>
                  <ul class="dropdown-menu dropdown-usermenu pull-right">
                    <li><a href="<?php echo base_url();?>admin/users/edit_profile"> Profile</a></li>
                    <li>
                      <a href="javascript:;">
                        <span class="badge bg-red pull-right">50%</span>
                        <span>Settings</span>
                      </a>
                    </li>                    
                    <li><a href="<?php echo base_url();?>admin/logout"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- /top navigation -->
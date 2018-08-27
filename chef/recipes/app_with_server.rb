#
# Cookbook Name:: chef-nodeapp
# Recipe:: app_with_server
#
# Copyright (C) 2018 Chris Allen
#
# All rights reserved - Do Not Redistribute
#


# Enable the service if not already
if 'enabled' != `sudo systemctl is-enabled nodeapp`.strip!
  service 'nodeapp' do
    action [ :enable ]
  end
end

# Restart the service
service 'nodeapp' do
  action [ :restart ]
end
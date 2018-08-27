#
# Cookbook Name:: chef-nodeapp
# Recipe:: server
#
# Copyright (C) 2016 Chris Allen
#
# All rights reserved - Do Not Redistribute
#

app = node.attribute?('vagrant') ? node['vagrant']['app'] : search('aws_opsworks_app').first
domain = app['domains'][0]
user = node.attribute?('vagrant') ? 'vagrant' : 'ubuntu'

# Create log file for daemon
directory "/var/log/nodeapp" do
  recursive true
end
file "/var/log/nodeapp/nodeapp.log" do
  mode 0666
  action :create_if_missing
end

# Daemonize node application
template '/etc/systemd/system/nodeapp.service' do
  source 'nodeapp.service'
  variables(
    :user => "#{user}",
  )
end

bash "reload_service_config" do
  code "systemctl daemon-reload"
end

# Setup simple nginx proxy to node port
package 'nginx'
template '/etc/nginx/sites-available/default' do
  source 'nginx.conf.erb'
  variables( :server_name => "#{domain}" )
  user "ubuntu"
end
service 'nginx' do
    action [ :restart ]
end

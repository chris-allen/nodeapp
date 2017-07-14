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

# Create log file for daemon
directory "/var/log/nodeapp" do
  recursive true
end
file "/var/log/nodeapp/nodeapp.log" do
  mode 0666
  action :create_if_missing
end

# Daemonize node application
include_recipe "supervisord"
supervisord_program "node-server" do
  command "npm run production"
  process_name 'node-server'
  numprocs 1
  priority 998
  autostart true
  autorestart true
  startsecs 10
  user "ubuntu"
  stdout_logfile '/var/log/nodeapp/nodeapp.log'
  stdout_logfile_backups 10
  stdout_events_enabled true
  stdout_syslog true
  stderr_logfile '/var/log/nodeapp/nodeapp.log'
  stderr_logfile_backups 88
  stderr_events_enabled true
  stderr_syslog true
  environment "HOME=/home/ubuntu"
  directory "/home/ubuntu/nodeapp/nodeapp"
  serverurl '/tmp/supervisor.sock'
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

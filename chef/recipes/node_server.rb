#
# Cookbook Name:: chef-nodeapp
# Recipe:: node_server
#
# Copyright (C) 2016 Chris Allen
#
# All rights reserved - Do Not Redistribute
#

if Dir.exists? '/home/vagrant'
  user = 'vagrant'
else
  user = 'ubuntu'
end

app = node.attribute?('vagrant') ? node['vagrant']['app'] : search('aws_opsworks_app').first
domain = app['domains'][0]

directory "/var/log/nodeapp" do
  recursive true
end

file "/var/log/nodeapp/nodeapp.log" do
  mode 0666
  action :create_if_missing
end

include_recipe "supervisord"

supervisord_program "node-server" do
  command "npm run production"
  process_name 'node-server'
  numprocs 1
  priority 998
  autostart true
  autorestart true
  startsecs 10
  user "#{user}"
  stdout_logfile '/var/log/nodeapp/nodeapp.log'
  stdout_logfile_backups 10
  stdout_events_enabled true
  stdout_syslog true
  stderr_logfile '/var/log/nodeapp/nodeapp.log'
  stderr_logfile_backups 88
  stderr_events_enabled true
  stderr_syslog true
  environment "HOME=/home/#{user}"
  directory "/home/#{user}/nodeapp/nodeapp"
  serverurl '/tmp/supervisor.sock'
end

bash "sudo supervisorctl restart node-server"


package 'nginx'

template '/etc/nginx/sites-available/default' do
  source 'nginx.conf.erb'
  variables( :server_name => "#{domain}" )
  user "#{user}"
end

service 'nginx' do
    action [ :restart ]
end

@extends('admin.layouts.app')

@section('content')
	<!-- ============================================================== -->
    <!-- Bread crumb and right sidebar toggle -->
    <!-- ============================================================== -->
	<div class="page-breadcrumb">
        <div class="row">
            <div class="col-5 align-self-center">
                <h4 class="page-title">{{ __('Contact') }}</h4>
            </div>
            <div class="col-7 align-self-center">
                <div class="d-flex align-items-center justify-content-end">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="{{ url('/admin/dashboard') }}">Home</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('Contact') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <!-- Container fluid  -->
    <!-- ============================================================== -->
    <div class="container-fluid">
        <!-- ============================================================== -->
        <!-- Start Page Content -->
        <!-- ============================================================== -->
        <div class="row">
            <div class="col-12">
                    <div class="card">
                    	@if(session('success'))
                            <div class="alert alert-success alert-dismissible">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h4><i class="icon fa fa-check"></i> Thông báo!</h4>
                                {{session('success')}}
                            </div>
                        @endif
                        <div class="table-responsive">
                            <table class="table">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        @foreach($getBlog as $key => $value)
                                        <tr>
                                            <th scope="row">{{$key + 1}}</th>
                                            <td>{{$value['title']}}</td>
                                            <td>{{$value['image']}}</td>
                                            <td>{{$value['description']}}</td>
                                            <td>
                                                <a class="sidebar-link waves-effect waves-dark sidebar-link" href="{{ url('/admin/blog/edit/'.$value['id']) }}" aria-expanded="false">
                                                    <i class="mdi mdi-account-edit">Edit</i>
                                                </a>
                                                &nbsp &nbsp
                                                <a class="sidebar-link waves-effect waves-dark sidebar-link" href="{{ url('/admin/blog/delete/'.$value['id']) }}" aria-expanded="false">
                                                    <i class="mdi mdi-delete">Delete</i>
                                                </a>                                             
                                            </td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                             </table>

                             <div style="float: right; margin-right: 10px;">
                                    {{ $getBlog->links() }}

                            </div>
                             




                        </div>

                    </div>
                    <div class="form-group">
                                <div class="col-sm-12">
                                    <a href="{{ url('/admin/blog/add') }}"><button class="btn btn-success">Add Blog</button></a>
                                </div>
                    </div>
                            <!--  -->
            </div>
        </div>
    </div>
     <!-- end Container fluid  -->
@endsection
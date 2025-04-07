using PIVF.Web.App_Start;
using System.Web.Optimization;
namespace PIVF.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
           
            bundles.Add(new ScriptBundle("~/bundles/angularScripts").Include(
                     "~/Scripts/AngularPackages/jquery-2.1.0.min.js",
                     "~/Scripts/AngularPackages/jquery.signalR-2.2.1.min.js",
                     "~/Scripts/AngularPackages/jquery-ui-1.10.3.custom.min.js",
                     "~/Scripts/AngularPackages/bootstrap.min.js",
                      //"~/Scripts/AngularPackages/tooltip-viewport.js",
                     "~/Scripts/AngularPackages/dev.js",
                     "~/Scripts/AngularPackages/angular.min.js",
                     "~/Scripts/AngularPackages/angular-route.min.js",
                     "~/Scripts/AngularUI/ui-bootstrap-tpls.min.js",
                     "~/Scripts/AngularPackages/angular-local-storage.min.js",
                     "~/Scripts/AngularPackages/ng-img-crop.min.js",
                     //"~/Scripts/AngularPackages/ng-file-upload-all.js",  //do not un comment by rohini
                     "~/Scripts/AngularPackages/angular-messages.min.js",
                     "~/Scripts/AngularPackages/angular-toasty.min.js",
                     "~/Scripts/AngularPackages/SweetAlert.min.js",
                     "~/Scripts/AngularPackages/ng-sweet-alert.min.js",
                     "~/Scripts/AngularPackages/webcam.min.js",
                      "~/Scripts/AngularPackages/ui-grid.js", //Added by AniketK on 09Oct2019
                     "~/Scripts/AngularPackages/isteven-multi-select.js", //*Added by sujata p on 18/10/2019*/
                     "~/Scripts/AngularPackages/ocLazyLoad.min.js",
                     "~/Scripts/AngularPackages/select.min.js",
                     "~/Scripts/AngularPackages/angular-translate.min.js",
                     "~/Scripts/AngularPackages/angular-ui-tree.min.js",                     
                     "~/Scripts/AngularPackages/angular-strap.min.js",
                     "~/Scripts/AngularPackages/angular-strap.tpl.min.js",
                     "~/Scripts/AngularPackages/angular-sanitize.min.js",
                     "~/Scripts/AngularPackages/tv4.js",
                     "~/Scripts/AngularPackages/ObjectPath.js",
                     "~/Scripts/AngularPackages/schema-form.js",
                     "~/Scripts/AngularPackages/bootstrap-decorator.js",
                     "~/Scripts/AngularPackages/schema-form-date-time-picker.min.js",
                     "~/Scripts/AngularPackages/date.js",
                     "~/Scripts/AngularPackages/ui-sortable.js",
                     "~/Scripts/AngularPackages/angular-schema-form-dynamic-select.js",
                     "~/Scripts/AngularPackages/angular-schema-form-base64-file-upload.js",
                     "~/Scripts/AngularPackages/BreadCum.js",
                     "~/Scripts/AngularPackages/ng-file-upload-all.min.js",  //do not comment used for design emr file upload by rohini
                     "~/Scripts/AngularPackages/schema-form-file.js",
                     "~/Scripts/AngularPackages/jquery.mCustomScrollbar.concat.min.js",
                     "~/Scripts/AngularPackages/scrollbars.min.js",
                     "~/Scripts/AngularPackages/underscore.js",
                     "~/Scripts/AngularPackages/angu-fixed-header-table.js",
                     "~/Scripts/AngularPackages/textAngular-rangy.min.js",
                     "~/Scripts/AngularPackages/textAngular-sanitize.min.js",
                     "~/Scripts/AngularPackages/textAngular.min.js",
                     "~/Scripts/AngularPackages/html2canvas.min.js",
                     "~/Scripts/AngularPackages/pdfmake.min.js",
                     "~/Scripts/AngularPackages/pdf.js",
                     "~/Scripts/AngularPackages/pdf.worker.js",
                     "~/Scripts/AngularPackages/spin.js",
                      "~/Scripts/AngularPackages/angular-spinner.js",
                     "~/Scripts/AngularPackages/ngPrint.js",
                     "~/Scripts/AngularPackages/angular-pdf.js",
                     "~/Scripts/AngularPackages/angular-object-diff.js",
                     "~/Scripts/AngularPackages/perfect-scrollbar.jquery.min.js",
                     "~/Scripts/AngularPackages/angular-perfect-scrollbar.min.js",
                        "~/Scripts/AngularPackages/moment.js",
                     "~/Scripts/AngularPackages/Chart.min.js",
                     "~/Scripts/AngularPackages/chartjs-plugin-datalabels.min.js",
                     "~/Scripts/AngularPackages/angular-chart.min.js",
                   "~/Scripts/AngularPackages/ui-cropper.js",              /*Added by Nayan Kamble on 12/06/2019*/
                    "~/Scripts/AngularPackages/moment-with-locales.js",
                      "~/Scripts/AngularPackages/angular-moment-picker.js",
                      "~/Scripts/AngularPackages/ngComboDatePicker.js",
                        "~/Scripts/AngularPackages/angularjs-dropdown-multiselect.min.js",   //*Added by sujata p on 18/10/2019*/
                       "~/Scripts/AngularPackages/angular-input-modified.js", 
                       "~/Scripts/AngularPackages/ngDialog.min.js",
                       "~/Scripts/AngularPackages/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar.js",
                      "~/Scripts/AngularPackages/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js",
                      "~/Scripts/AngularPackages/fusioncharts.js",
                      "~/Scripts/AngularPackages/fusioncharts.charts.js",
                      "~/Scripts/AngularPackages/fusioncharts.theme.fusion.js",
                      "~/Scripts/AngularPackages/angular-fusioncharts.min.js"
            ));
            bundles.Add(new StyleBundle("~/Content/css").Include(
               "~/Content/ui-grid.css", //Added by AniketK on 09Oct2019
                "~/Content/bootstrap.css",
                "~/Content/dev.css",
                "~/Content/select.css",
                "~/Content/select2.css",
                "~/Content/select2-bootstrap.css",
                "~/Content/isteven-multi-select.css",
                "~/Content/font-awesome.css",
                "~/Content/Site.css",
                "~/Content/ngDialog.css",
                "~/Content/ngDialog-theme-default.min.css"
               ));
            BundleTable.EnableOptimizations = false;
        }
    }
}
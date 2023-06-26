import { Component, OnInit, ViewChild } from '@angular/core';
import { Event } from 'src/app/models/event';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from 'src/app/models/tableColum';
import { EventsService } from 'src/app/services/events.service';
import { Result } from 'src/app/models/result';
import { MatPaginatorIntl } from '@angular/material/paginator';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})



export class EventsComponent implements OnInit {
  eventList : Array<Event> = []
  dataSource = new MatTableDataSource(this.eventList);
  tableColumns: TableColumn[] = [];
  tableDisplayColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  isLoadingResults: boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  
  constructor(
    private eventsService: EventsService,
    private paginatorIntl: MatPaginatorIntl
  ) {
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
    this.sort.sortChange.subscribe(() => (this.sortChange()));

    this.getEvents();

    

  }

  sortChange(){
    this.isLoadingResults = true;
    this.paginator.pageIndex = 0;
    this.getEvents()
  }
  ngOnInit(): void {
    this.paginatorIntl.nextPageLabel = 'Siguiente página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.lastPageLabel = 'Última página';
    this.paginatorIntl.firstPageLabel = 'Primera página';
    this.paginatorIntl.itemsPerPageLabel = 'Items por página'

    this.setTableColumns();
  }

  getEvents(){
    
    this.eventsService.getAll<Result<Event>>(this.sort.active,
      this.sort.direction == 'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize)
    .subscribe( (resp) => {
      if(resp.result){
        this.eventList = resp.resultList
        this.dataSource = new MatTableDataSource(this.eventList);
        this.paginator.length = resp.total
      }
      setTimeout(() => {
        this.isLoadingResults = false;
      }, 1000);
      
      
    })
  }
  onPageSizeChange(event: any) {
    this.isLoadingResults = true;
    this.getEvents()
  }
  onPageChange(event: PageEvent){
    this.isLoadingResults = true;
    this.getEvents()
  }
  setTableColumns() {
    this.tableColumns = [
      { label: 'Institución', def: 'institutionName', dataKey: 'institutionName', sort: true },
      { label: 'Dirección institución', def: 'institutionAddress', dataKey: 'institutionAddress', sort: false },
      { label: 'Número de estudiantes', def: 'numStudents', dataKey: 'numStudents', sort: false},
      { label: 'Fecha evento', def: 'startTime', dataKey: 'startTime', dataType: 'date', formatt: 'dd/MM/yyyy HH:mm', sort: true },
      { label: 'Valor base', def: 'baseValue', dataKey: 'baseValue',dataType: 'number', sort: false },
      { label: 'Valor adicional', def: 'additionalValue', dataKey: 'additionalValue',dataType: 'number', sort: false }
    ];

    this.tableDisplayColumns = this.tableColumns.map((col) => col.def);
  }
}


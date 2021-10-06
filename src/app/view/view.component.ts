import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
interface viewData {
  name: string;
  children?: viewData[];
}
const TREE_DATA: viewData[] = [
  {
    name: 'Computer Information',
    children: [
      {name: 'Invoice No:'},
      {name: 'Seller Name:'},
      {name: 'Computer Name:'},
      {name:'Date:'},
      {name:'Ram Information',
    children:[{name:'Company Name:'},
  {name:'Size:'},
{name:'Warranty:'}]}
    ]
  }, 
];
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  private _transformer = (node: viewData, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  

  ngOnInit(): void {
  }

}

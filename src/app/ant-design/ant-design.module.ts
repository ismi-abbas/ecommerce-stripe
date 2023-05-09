import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzDescriptionsModule,
    NzSpaceModule,
    NzButtonModule,
    NzIconModule,
    NzTypographyModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzCardModule,
    NzDividerModule,
    NzBadgeModule,
  ],
  exports: [
    NzLayoutModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzDescriptionsModule,
    NzSpaceModule,
    NzButtonModule,
    NzIconModule,
    NzTypographyModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzCardModule,
    NzDividerModule,
    NzBadgeModule,
  ],
})
export class AntDesignModule {}

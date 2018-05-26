import * as React from 'react';

import * as d3 from 'd3';
import { PieArcDatum } from 'd3';

const xLabels = ['A+', 'A0', 'A-', 'B+', 'B0', 'B-', 'C+', 'C0', 'C-', 'D+'];

const margin = {
  top: 5,

  bottom: 5,

  left: 5,

  right: 5,
};

export interface IProps {
  width: number;
  height: number;
  grades: number[];

  globalMax: number;
}

export default class D3Chart extends React.Component<IProps> {
  public container: React.RefObject<HTMLDivElement>;
  public tooltip: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.container = React.createRef();
    this.tooltip = React.createRef();
  }

  public componentDidMount() {
    this.update();
  }

  public componentDidUpdate() {
    this.update();
  }

  public update() {
    this.updatePie();
  }

  public updatePie() {
    const { width, height, grades } = this.props;

    interface IDatum {
      label: string;
      value: number;
    }

    const pieMargin = 10;
    const data = xLabels
      .map((label, index): IDatum => ({
        label,
        value: grades[index],
      }))
      .reverse();

    const radius = Math.min(width, height) / 2 - pieMargin;
    const center = `${pieMargin + radius},${pieMargin + radius}`;

    const pie = d3
      .pie<IDatum>()
      .sort(null)
      .value(d => d.value);
    const arc = d3
      .arc<PieArcDatum<IDatum>>()
      .innerRadius(0)
      .outerRadius(radius);

    const color = (index: number) =>
      d3.interpolateSpectral(index / data.length);

    const svg = d3
      .select(this.container.current)
      .select('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg
      .select('.pie')
      .attr('transform', `translate(${center})`)
      .attr('class', '.pie');

    const fractionSelect = g.selectAll('.fraction').data(pie(data));

    const fraction = fractionSelect
      .enter()
      .append('g')
      .attr('class', '.fraction');

    fractionSelect.exit().remove();

    fraction
      .append('path')
      .attr('d', arc)
      .attr('fill', (_, index: number) => color(index))
      .on('mouseover', d => {
        if (this.container.current && this.tooltip.current) {
          const [x, y] = d3.mouse(this.container.current);
          d3
            .select(this.tooltip.current)
            .style('top', `${y - 10}px`)
            .style('left', `${x + 10}px`)
            .style('display', 'block')
            .text(`${d.data.label} ${d.data.value}`);
        }
      })
      .on('mouseleave', () => {
        d3.select(this.tooltip.current).style('display', 'none');
      });
  }

  public updateHistogram() {
    const { width, height, globalMax, grades } = this.props;
    const data = grades.slice(0, xLabels.length);
    let max = d3.max(data);

    if (!data || !max) {
      return;
    }

    max = Math.max(globalMax, max);

    const x = d3
      .scaleLinear()
      .domain([0, data.length])
      .nice()
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, max])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const container = d3.select(this.container.current);
    const svg = container
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg
      .append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (_, i) => x(i) + 1)
      .attr('width', (_, i) => x(i + 1) - x(i) - 1)
      .attr('y', d => y(d))
      .attr('height', d => y(0) - y(d));
  }

  public render() {
    return (
      <div ref={this.container} style={{ position: 'relative' }}>
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            borderRadius: 4,
            color: 'white',
            display: 'none',
            padding: 8,
            position: 'absolute',
          }}
          ref={this.tooltip}
        />
        <svg>
          <g className="pie" />
        </svg>
      </div>
    );
  }
}
